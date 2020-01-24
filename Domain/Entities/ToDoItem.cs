using Domain.Enums;
using Domain.Models;
using System;

namespace Domain
{
    public class ToDoItem : EntityBase
    {
        public DateTime Date { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public ImportanceType ImportanceType { get; set; }
    }
}
