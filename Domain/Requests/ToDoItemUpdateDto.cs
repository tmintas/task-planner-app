using System;
using System.ComponentModel.DataAnnotations;

namespace Domain.Requests
{
    public class ToDoItemUpdateDto
    {
        public DateTime Date { get; set; }

        [Required]
        [StringLength(15, ErrorMessage = "Name cannot be longer that 3 chars")]
        public string Name { get; set; }

        [StringLength(30, ErrorMessage = "Description cannot be longer that 30 chars")]
        public string Description { get; set; }

        [Required]
        [Range(0,100)]
        public Enums.ImportanceType ImportanceTypeId { get; set; }
    }
}
