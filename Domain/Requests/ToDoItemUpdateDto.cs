using Domain.Enums;
using System;
using System.ComponentModel.DataAnnotations;

namespace Domain.Requests
{
    public class ToDoItemUpdateDto
    {
        public DateTime Date { get; set; }

        [Required]
        [StringLength(3, ErrorMessage = "Name cannot be longer that 3 chars")]
        public string Name { get; set; }

        [StringLength(30, ErrorMessage = "Name cannot be longer that 3 chars")]
        public string Description { get; set; }

        public ImportanceType ImportanceType { get; set; }
    }
}
