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

namespace Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TodoController : ControllerBase
    {
        private readonly IDatabaseRepository<Todo> todoRepository;

        private readonly IMapper mapper;

        public TodoController(IDatabaseRepository<Todo> todoRepository, IMapper mapper)
        {
            this.todoRepository = todoRepository;
            this.mapper = mapper;
        }

        // GET: api/user-todos
        [HttpGet]
        [Authorize]
        [Route("user-todos")]
        public async Task<ActionResult<IEnumerable<TodoDto>>> GetUserTodos()
        {
            var userId = this.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;

            var todos = (await todoRepository.GetAllAsync())
                .Where(i => i.UserId == userId)
                .Select(todo => mapper.Map<TodoDto>(todo))
                .ToList();

            return Ok(todos);
        }

        // GET: api/Todo/5
        [HttpGet("{id}")]
        [Authorize]
        [ServiceFilter(typeof(EntityExistsValidationFilter<Todo>))]
        public ActionResult<TodoDto> GetTodo(int id)
        {
            var todo = HttpContext.Items["entity"] as Todo;
            var dto = mapper.Map<TodoDto>(todo);

            return Ok(dto);
        }

        // POST: api/Todo
        [HttpPost]
        [Authorize]
        [ServiceFilter(typeof(ModelValidationFilter))]
        public async Task<ActionResult<TodoDto>> PostTodo([FromBody] TodoDto todoCreateDto)
        {
            var todo = this.mapper.Map<Todo>(todoCreateDto);

            await this.todoRepository.AddAsync(todo);

            todoCreateDto = this.mapper.Map<TodoDto>(todo);

            return CreatedAtAction(nameof (PostTodo), todoCreateDto);
        }

        //PUT: api/Todo/5
        [HttpPut("{id}")]
        [Authorize]
        [ServiceFilter(typeof(ModelValidationFilter))]
        [ServiceFilter(typeof(EntityExistsValidationFilter<Todo>))]
        public async Task<IActionResult> UpdateTodo(int id, [FromBody] TodoDto todoUpdateDto)
        {
            var oldTodo = HttpContext.Items["entity"] as Todo;
            var updatedTodo = mapper.Map(todoUpdateDto, oldTodo);

            await todoRepository.UpdateAsync(updatedTodo);

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
