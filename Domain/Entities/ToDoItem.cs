using Domain.Entities;
using Domain.Models;
using System;

namespace Domain
{
    public class ToDoItem : EntityBase
    { 
        public DateTime Date { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }
        public Enums.ImportanceType ImportanceTypeId { get; set; }
    }
}
