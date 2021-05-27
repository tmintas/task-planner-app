using Domain.Requests;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web.Repositories.Contracts;
using Microsoft.AspNetCore.Authorization;
using Web.Services.Contracts;
using Web.Middleware;
using Web.Models.Entities;

namespace Web.Controllers
{
    [Route("api/Todo")]
    [ApiController]
    public class ToDoController : ControllerBase
    {
        private readonly IDatabaseRepository<Todo> todoRepository;
        private readonly IUserService userService;

        public ToDoController(IDatabaseRepository<Todo> todoRepository, IUserService userService)
        {
            this.todoRepository = todoRepository;
            this.userService = userService;
        }

        // GET: api/user-todos
        [HttpGet]
        [Authorize]
        [Route("user-todos")]
        public async Task<ActionResult<IEnumerable<Todo>>> GetUserTodos()
        {
            var items = await todoRepository.GetAllAsync();
            var user = await userService.GetCurrentUser();
            var userItems = items.Where(i => i.UserId == user.Id);

            return Ok(userItems);
        }

        // GET: api/Todo/5
        [HttpGet("ping")]
        public ActionResult<Todo> Ping(int id)
        {
            return Ok(new { test = 4 });
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
        public async Task<ActionResult<Todo>> PostTodo([FromBody] TodoDto itemUpdateDto)
        {
            var currentUser = await userService.GetCurrentUser();

            var newItem = new Todo()
            {
                Date = itemUpdateDto.Date.ToLocalTime(),
                Description = itemUpdateDto.Description,
                ImportanceTypeId = itemUpdateDto.ImportanceTypeId,
                Name = itemUpdateDto.Name,
                HasTime = itemUpdateDto.HasTime,
                UserId = currentUser.Id
            };
    
            await todoRepository.AddAsync(newItem);

            return CreatedAtAction("PostTodo", newItem);
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
