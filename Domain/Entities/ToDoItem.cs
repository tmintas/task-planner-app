using Domain.Models;
using System;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Domain
{
    public class ToDoItem : EntityBase
    {
        public DateTime Date { get; set; }

        public bool HasTime { get; set; }

        [MaxLength(20)]
        public string Name { get; set; }

        [MaxLength(50)]
        public string Description { get; set; }

        [JsonPropertyName("Importance")]
        public Enums.ImportanceType ImportanceTypeId { get; set; }
    }
}
