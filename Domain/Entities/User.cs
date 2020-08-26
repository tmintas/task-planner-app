//using Microsoft.AspNetCore.Identity;
//using System.Collections.Generic;
//using System.ComponentModel.DataAnnotations.Schema;
//using System.Text.Json.Serialization;

//namespace Domain.Entities
//{
//    public class User : IdentityUser<int>
//    {
//        [Column(TypeName = "nvarchar(150)")]
//        public string FullName { get; set; }

//        [JsonIgnore]
//        public List<RefreshToken> RefreshTokens { get; set; }
//    }
//}
