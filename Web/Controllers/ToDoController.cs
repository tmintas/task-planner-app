using Domain.Requests;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web.Repositories.Contracts;
using Microsoft.AspNetCore.Authorization;
using Web.Middleware;
using Web.Models.Entities;
using System.Security.Claims;
using AutoMapper;
using Web.Services.Contracts;

namespace Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TodoController : ControllerBase
    {
        private readonly IDatabaseRepository<Todo> todoRepository;

        private readonly ITodoService todoService;

        private readonly IMapper mapper;

        public TodoController(IDatabaseRepository<Todo> todoRepository, IMapper mapper, ITodoService todoService)
        {
            this.todoRepository = todoRepository;
            this.todoService = todoService;
            this.mapper = mapper;
        }

        // GET: api/user-todos
        [HttpGet]
        [Authorize]
        [Route("user-todos")]
        public async Task<ActionResult<IEnumerable<TodoDto>>> GetUserTodos()
        {
            var todos = await todoRepository.GetAllAsync();
            var userId = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var userTodos = todos.Where(i => i.UserId == userId);
            var todoDtos = userTodos.Select(todo => mapper.Map<TodoDto>(todo));

            return Ok(todoDtos);
        }


        // GET: api/Todo/5
        [HttpGet("{id}")]
        [Authorize]
        [ServiceFilter(typeof(EntityExistsValidationFilter<Todo>))]
        public ActionResult<Todo> GetTodo(int id)
        {
            var todo = HttpContext.Items["entity"] as Todo;

            return Ok(todo);
        }

        // POST: api/Todo
        [HttpPost]
        [Authorize]
        [ServiceFilter(typeof(ModelValidationFilter))]
        public async Task<ActionResult<TodoDto>> PostTodo([FromBody] TodoDto todoCreateDto)
        {
            var newTodoDto = await this.todoService.AddAsync(todoCreateDto);

            return CreatedAtAction(nameof (PostTodo), newTodoDto);
        }

        //PUT: api/Todo/5
        [HttpPut("{id}")]
        [Authorize]
        [ServiceFilter(typeof(ModelValidationFilter))]
        [ServiceFilter(typeof(EntityExistsValidationFilter<Todo>))]
        public async Task<IActionResult> UpdateTodo(int id, [FromBody] TodoDto itemUpdateDto)
        {
            var todoToUpdate = HttpContext.Items["entity"] as Todo;

            todoToUpdate.Date = itemUpdateDto.Date.ToLocalTime();
            todoToUpdate.Description = itemUpdateDto.Description;
            todoToUpdate.ImportanceTypeId = itemUpdateDto.ImportanceTypeId;
            todoToUpdate.Name = itemUpdateDto.Name;

            await todoRepository.UpdateAsync(todoToUpdate);

            return NoContent();
        }

        //PUT: api/toggle-done/5
        [HttpPut("toggle-done/{id}")]
        [Authorize]
        [ServiceFilter(typeof(EntityExistsValidationFilter<Todo>))]
        public async Task<IActionResult> ToggleDone(int id)
        {
            var todoToUpdate = HttpContext.Items["entity"] as Todo;

            todoToUpdate.IsDone = !todoToUpdate.IsDone;

            await todoRepository.UpdateAsync(todoToUpdate);

            return NoContent();
        }

        // DELETE: api/Todo/5
        [HttpDelete("{id}")]
        [Authorize]
        [ServiceFilter(typeof(EntityExistsValidationFilter<Todo>))]
        public async Task<ActionResult<Todo>> DeleteTodo(int id)
        {
            var todoToDelete = HttpContext.Items["entity"] as Todo;

            await todoRepository.DeleteAsync(todoToDelete);

            return todoToDelete;
        }
    }
}
