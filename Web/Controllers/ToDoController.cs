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
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class TodoController : ControllerBase
    {
        private readonly IDatabaseRepository<Todo> todoRepository;

        private readonly IMapper mapper;

        public TodoController(IDatabaseRepository<Todo> todoRepository, IMapper mapper)
        {
            this.todoRepository = todoRepository;
            this.mapper = mapper;
        }

        // GET: api/Todo/user-todos
        [HttpGet]
        [Authorize]
        [Route("user-todos")]
        public async Task<ActionResult<IEnumerable<TodoDto>>> GetUserTodos()
        {
            var userId = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
			var res = (await todoRepository.GetAllAsync());

            var todos = res
                .Where(i => i.UserId == userId)
                .Select(todo => mapper.Map<TodoDto>(todo))
                .ToList();

            return Ok(todos);
        }

        // GET: api/Todo/get-todo/5
        [HttpGet("get-todo/{id:int}")]
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
            var todo = mapper.Map<Todo>(todoCreateDto);
            todo.UserId = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;

            await todoRepository.AddAsync(todo);

            todoCreateDto = mapper.Map<TodoDto>(todo);

            return CreatedAtAction(nameof (PostTodo), todoCreateDto);
        }

        //PUT: api/Todo/5
        [HttpPut("{id:int}")]
        [ServiceFilter(typeof(ModelValidationFilter))]
        [ServiceFilter(typeof(EntityExistsValidationFilter<Todo>))]
        public async Task<ActionResult<TodoDto>> UpdateTodo(int id, [FromBody] TodoDto todoUpdateDto)
        {
            var oldTodo = HttpContext.Items["entity"] as Todo;
            var updatedTodo = mapper.Map(todoUpdateDto, oldTodo);

            updatedTodo = await todoRepository.UpdateAsync(updatedTodo);
            var updateTodoDto = mapper.Map<TodoDto>(updatedTodo);

            return Ok(updateTodoDto);
        }

        //PUT: api/toggle-done/5
        [HttpPut("toggle-done/{id:int}")]
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
        [HttpDelete("{id:int}")]
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
