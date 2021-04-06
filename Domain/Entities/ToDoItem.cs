//using Domain.Models;
//using System;
//using System.ComponentModel.DataAnnotations;
//using System.Text.Json.Serialization;
//using UserManagement.Models;

//namespace Domain
//{
//    public class ToDoItem : EntityBase
//    {
//        public DateTime Date { get; set; }

//        public bool HasTime { get; set; }

//        [Required]
//        [MaxLength(40)]
//        public string Name { get; set; }

//        [MaxLength(100)]
//        public string Description { get; set; }

//        [JsonPropertyName("Importance")]
//        public EImportanceTypeId ImportanceTypeId { get; set; }

//        [Required]
//        public bool IsDone { get; set; }

//        public string UserId { get; set; }

//        public ApplicationUser User { get; set; }
//    }
//}
