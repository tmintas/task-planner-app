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

        [Required]
        [MaxLength(40)]
        public string Name { get; set; }

        [MaxLength(100)]
        public string Description { get; set; }

        [JsonPropertyName("Importance")]
        public Enums.ImportanceType ImportanceTypeId { get; set; }

        [Required]
        public bool IsDone { get; set; }
    }
}
