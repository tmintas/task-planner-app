﻿using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Web.Models.Entities
{
    public class ApplicationUser : IdentityUser
    {
        [Column(TypeName = "nvarchar(150)")]
        public string FullName { get; set; }

        [JsonIgnore]
        public ICollection<RefreshToken> RefreshTokens { get; set; }

        [JsonIgnore]
        public ICollection<Todo> Todos { get; set; }
    }
}
