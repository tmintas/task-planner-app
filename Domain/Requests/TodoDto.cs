using System;
using System.ComponentModel.DataAnnotations;

namespace Domain.Requests
{
    public class TodoDto
    {
        [DataType(DataType.Date)]
        [Range(typeof(DateTime), "01/01/1900", "01/01/2100", ErrorMessage = "Date is out of range. Should be between 01.01.1900 and 01.01.2100")]
        public DateTime Date { get; set; }

        public bool HasTime { get; set; }

        [Required(ErrorMessage = "Name is required")]
        [StringLength(40, ErrorMessage = "Name cannot be longer that 40 chars")]
        public string Name { get; set; }

        [StringLength(100, ErrorMessage = "Description cannot be longer that 100 chars")]
        public string Description { get; set; }

        [Required(ErrorMessage = "Importance is required")]
        public Enums.ImportanceType Importance { get; set; }
    }
}
