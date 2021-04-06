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
        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<Todo>> GetToDoItem(int id)
        {
            var item = await todoRepository.GetByIdAsync(id);

            if (item == null) return NotFound();

            return Ok(item);
        }

        // POST: api/Todo
        [HttpPost]
        [Authorize]
        [ServiceFilter(typeof(ModelValidationFilter))]
        public async Task<ActionResult<Todo>> PostToDoItem([FromBody] TodoDto itemUpdateDto)
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

            return CreatedAtAction("PostToDoItem", newItem);
        }

        //PUT: api/Todo/5
        [HttpPut("{id}")]
        [Authorize]
        [ServiceFilter(typeof(ModelValidationFilter))]
        public async Task<IActionResult> UpdateToDoItem(int id, [FromBody] TodoDto itemUpdateDto)
        {
            var todoToUpdate = await todoRepository.GetByIdAsync(id);

            if (todoToUpdate == null)
            {
                return NotFound($"Item with id {id} was not found in the database");
            }

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
        public async Task<IActionResult> ToggleDone(int id)
        {
            var todo = await todoRepository.GetByIdAsync(id);
            if (todo == null)
            {
                return NotFound($"Item with id {id} was not found in the database");
            }

            todo.IsDone = !todo.IsDone;
            await todoRepository.UpdateAsync(todo);

            return NoContent();
        }

        // DELETE: api/Todo/5
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<ActionResult<Todo>> DeleteToDoItem(int id)
        {
            var toDoItem = await todoRepository.GetByIdAsync(id);
                
            if (toDoItem == null)
            {
                return NotFound();
            }

            await todoRepository.DeleteAsync(id);

            return toDoItem;
        }
    }
}
