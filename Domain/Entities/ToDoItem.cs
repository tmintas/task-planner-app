using Domain.Models;
using System;
using System.Text.Json.Serialization;

namespace Domain
{
    public class ToDoItem : EntityBase
    {
        public DateTime Date { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        [JsonPropertyName("Importance")]
        public Enums.ImportanceType ImportanceTypeId { get; set; }
    }
}
