using Domain;
using Domain.Requests;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web.Repositories.Contracts;

namespace Web.Controllers
{
    [Route("api/ToDo")]
    [ApiController]
    public class ToDoController : ControllerBase
    {
        private readonly IDatabaseRepository<ToDoItem> repository;

        public ToDoController(IDatabaseRepository<ToDoItem> todoRepository)
        {
            repository = todoRepository;
        }

        // GET: api/ToDoItems
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ToDoItem>>> GetAllTodos()
        {
            var items = await repository.GetAllAsync();

            return Ok(items);
        }

        // GET: api/ToDoItems/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ToDoItem>> GetToDoItem(int id)
        {
            var item = await repository.GetByIdAsync(id);

            if (item == null) return NotFound();

            return Ok(item);
        }

        // GET: api/ToDoItems/5
        [HttpPost]
        public async Task<ActionResult<ToDoItem>> PostToDoItem(ToDoItem item)
        {
            if (item == null) return NotFound();

            await repository.AddAsync(item);

            return CreatedAtAction("PostToDoItem", new { id = item.Id }, item);
        }

        //PUT: api/ToDoItems/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutToDoItem(int id, [FromBody] ToDoItemUpdateDto itemUpdateDto)
        {
            if (await repository.GetByIdAsync(id) == null)
            {
                return NotFound($"Item with id {id} was not found in the database");
            }
            if (!ModelState.IsValid)
            {
                var errorList = ModelState.Keys.SelectMany(key => ModelState[key].Errors.Select(err => err.ErrorMessage).ToList());
                var errorMsg = string.Join(',', errorList);

                return BadRequest(errorMsg);
            }

            ToDoItem itemToUpdate = await repository.GetByIdAsync(id);

            itemToUpdate.Date = itemUpdateDto.Date;
            itemToUpdate.Description = itemUpdateDto.Description;
            itemToUpdate.ImportanceType = itemUpdateDto.ImportanceType;
            itemToUpdate.Name = itemUpdateDto.Name;

            await repository.UpdateAsync(itemToUpdate);

            return NoContent();
        }


        // DELETE: api/ToDoItems/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ToDoItem>> DeleteToDoItem(int id)
        {
            var toDoItem = await repository.GetByIdAsync(id);
                
            if (toDoItem == null)
            {
                return NotFound();
            }

            await repository.DeleteAsync(id);

            return toDoItem;
        }
    }
}
