﻿using Domain;
using Domain.Requests;
using Domain.Enums;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web.Repositories.Contracts;
using Microsoft.AspNetCore.Authorization;
using Web.Services.Contracts;

namespace Web.Controllers
{
    [Route("api/Todo")]
    [ApiController]
    public class ToDoController : ControllerBase
    {
        private readonly IDatabaseRepository<ToDoItem> todoRepository;
        private readonly IUserService userService;

        public ToDoController(IDatabaseRepository<ToDoItem> todoRepository, IUserService userService)
        {
            this.todoRepository = todoRepository;
            this.userService = userService;
        }

        // GET: api/user-todos
        [HttpGet]
        [Authorize]
        [Route("user-todos")]
        public async Task<ActionResult<IEnumerable<ToDoItem>>> GetUserTodos()
        {
            var items = await todoRepository.GetAllAsync();
            var user = await userService.GetCurrentUser();
            var userItems = items.Where(i => i.UserId == user.Id);

            return Ok(userItems);
        }

        // GET: api/Todo/5
        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<ToDoItem>> GetToDoItem(int id)
        {
            var item = await todoRepository.GetByIdAsync(id);

            if (item == null) return NotFound();

            return Ok(item);
        }

        // POST: api/Todo/5
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<ToDoItem>> PostToDoItem([FromBody] TodoDto itemUpdateDto)
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

            var currentUser = await userService.GetCurrentUser();

            var newItem = new ToDoItem()
            {
                Date = itemUpdateDto.Date.ToLocalTime(),
                Description = itemUpdateDto.Description,
                ImportanceTypeId = itemUpdateDto.Importance,
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
        public async Task<IActionResult> UpdateToDoItem(int id, [FromBody] TodoDto itemUpdateDto)
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

            ToDoItem itemToUpdate = await todoRepository.GetByIdAsync(id);
            if (itemToUpdate == null)
            {
                return NotFound($"Item with id {id} was not found in the database");
            }

            itemToUpdate.Date = itemUpdateDto.Date.ToLocalTime();
            itemToUpdate.Description = itemUpdateDto.Description;
            itemToUpdate.ImportanceTypeId = itemUpdateDto.Importance;
            itemToUpdate.Name = itemUpdateDto.Name;

            await todoRepository.UpdateAsync(itemToUpdate);

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
        public async Task<ActionResult<ToDoItem>> DeleteToDoItem(int id)
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
