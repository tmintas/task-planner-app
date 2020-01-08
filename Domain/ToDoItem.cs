using System;

namespace Domain
{
    public class ToDoItem
    {
        public int Id { get; set; }

        public DateTime Date { get; set; }

        public string Name { get; set; }

        public string Descriptionh { get; set; }

        public Importance Importance { get; set; }
    }

    public enum Importance
    {
        Low = 1,
        Middle = 2,
        High = 3
    }
}
