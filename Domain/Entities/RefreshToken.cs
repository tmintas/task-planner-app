using Domain.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using UserManagement.Models;

namespace Domain.Entities
{
    public class RefreshToken
    {
        [Key]
        [JsonIgnore]
        public int Id { get; set; }

        public string Token { get; set; }

        public DateTime ExpirationDate { get; set; }

        public DateTime CreationDate { get; set; }

        public DateTime? RevokationDate { get; set; }

        public string ReplacedByToken { get; set; }

        public ApplicationUser User { get; set; }

        public string UserId { get; set; }

        //public bool IsExpired => DateTime.Now >= ExpirationDate;

        //public bool IsValid => RevokationDate == null && !IsExpired;
    }
}
