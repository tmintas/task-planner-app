using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Domain;
using Infrastructure;
using Web.Repositories.Contracts;

namespace Web.Controllers
{
    [Route("api/ToDo")]
    [ApiController]
    public class ToDoItemsController : ControllerBase
    {
        private readonly IDatabaseRepository<ToDoItem> repository;

        public ToDoItemsController(IDatabaseRepository<ToDoItem> todoRepository)
        {
            repository = todoRepository;
        }

        // GET: api/ToDoItems
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ToDoItem>>> GetAllTodos()
        {
            return await repository.QueryAll().ToListAsync();
        }

        // GET: api/ToDoItems/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ToDoItem>> GetToDoItem(int id)
        {
            return await repository.GetByIdAsync(id);
        }

        // PUT: api/ToDoItems/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        //[HttpPut("{id}")]
        //public async Task<IActionResult> PutToDoItem(int id, ToDoItem toDoItem)
        //{
        //    if (id != toDoItem.Id)
        //    {
        //        return BadRequest();
        //    }

        //    _context.Entry(toDoItem).State = EntityState.Modified;

        //    try
        //    {
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!ToDoItemExists(id))
        //        {
        //            return NotFound();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }

        //    return NoContent();
        //}

        //// POST: api/ToDoItems
        //// To protect from overposting attacks, please enable the specific properties you want to bind to, for
        //// more details see https://aka.ms/RazorPagesCRUD.
        //[HttpPost]
        //public async Task<ActionResult<ToDoItem>> PostToDoItem(ToDoItem toDoItem)
        //{
        //    _context.ToDoItems.Add(toDoItem);
        //    await _context.SaveChangesAsync();

        //    return CreatedAtAction("GetToDoItem", new { id = toDoItem.Id }, toDoItem);
        //}

        //// DELETE: api/ToDoItems/5
        //[HttpDelete("{id}")]
        //public async Task<ActionResult<ToDoItem>> DeleteToDoItem(int id)
        //{
        //    var toDoItem = await _context.ToDoItems.FindAsync(id);
        //    if (toDoItem == null)
        //    {
        //        return NotFound();
        //    }

        //    _context.ToDoItems.Remove(toDoItem);
        //    await _context.SaveChangesAsync();

        //    return toDoItem;
        //}

        //private bool ToDoItemExists(int id)
        //{
        //    return _context.ToDoItems.Any(e => e.Id == id);
        //}
    }
}
