using Domain;
using Domain.Requests;
using Domain.Enums;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web.Repositories.Contracts;
using Microsoft.AspNetCore.Cors;
using System;
using Microsoft.AspNetCore.Authorization;

namespace Web.Controllers
{
    [Route("api/Todo")]
    [ApiController]
    public class ToDoController : ControllerBase
    {
        private readonly IDatabaseRepository<ToDoItem> _todoRepository;

        public ToDoController(IDatabaseRepository<ToDoItem> todoRepository)
        {
            _todoRepository = todoRepository;
        }

        // GET: api/Todo
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ToDoItem>>> GetAllTodos()
        {
            var items = await _todoRepository.GetAllAsync();

            return Ok(items);
        }

        // GET: api/Todo/5
        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<ToDoItem>> GetToDoItem(int id)
        {
            var item = await _todoRepository.GetByIdAsync(id);

            if (item == null) return NotFound();

            return Ok(item);
        }

        // GET: api/Todo/5
        [HttpPost]
        public async Task<ActionResult<ToDoItem>> PostToDoItem([FromBody] ToDoItemUpdateDto itemUpdateDto)
        {
            if (itemUpdateDto == null)
            {
                return NotFound($"Item is empty");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var availbleImportances = new[] { ImportanceType.High, ImportanceType.Middle, ImportanceType.Low };
            if (!availbleImportances.Any(i => i == itemUpdateDto.Importance))
            {
                return BadRequest("Wrong importance type");
            }

            var newItem = new ToDoItem();
            newItem.Date = itemUpdateDto.Date.ToLocalTime();
            newItem.Description = itemUpdateDto.Description;
            newItem.ImportanceTypeId = itemUpdateDto.Importance;
            newItem.Name = itemUpdateDto.Name;
            newItem.HasTime = itemUpdateDto.HasTime;

            await _todoRepository.AddAsync(newItem);

            return CreatedAtAction("PostToDoItem", newItem);
        }

        //PUT: api/Todo/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateToDoItem(int id, [FromBody] ToDoItemUpdateDto itemUpdateDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var availbleImportances = new[] { ImportanceType.High, ImportanceType.Middle, ImportanceType.Low };
            if (!availbleImportances.Any(i => i == itemUpdateDto.Importance))
            {
                return BadRequest("Wrong importance type");
            }

            ToDoItem itemToUpdate = await _todoRepository.GetByIdAsync(id);
            if (itemToUpdate == null)
            {
                return NotFound($"Item with id {id} was not found in the database");
            }

            itemToUpdate.Date = itemUpdateDto.Date.ToLocalTime();
            itemToUpdate.Description = itemUpdateDto.Description;
            itemToUpdate.ImportanceTypeId = itemUpdateDto.Importance;
            itemToUpdate.Name = itemUpdateDto.Name;

            await _todoRepository.UpdateAsync(itemToUpdate);

            return NoContent();
        }

        //PUT: api/toggle-done/5
        [HttpPut("toggle-done/{id}")]
        public async Task<IActionResult> ToggleDone(int id)
        {
            var todo = await _todoRepository.GetByIdAsync(id);
            if (todo == null)
            {
                return NotFound($"Item with id {id} was not found in the database");
            }

            todo.IsDone = !todo.IsDone;
            await _todoRepository.UpdateAsync(todo);

            return NoContent();
        }

        // DELETE: api/Todo/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ToDoItem>> DeleteToDoItem(int id)
        {
            var toDoItem = await _todoRepository.GetByIdAsync(id);
                
            if (toDoItem == null)
            {
                return NotFound();
            }

            await _todoRepository.DeleteAsync(id);

            return toDoItem;
        }
    }
}
