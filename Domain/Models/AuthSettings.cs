using System.ComponentModel.DataAnnotations;

namespace Domain.Models
{
    public class AuthSettings
    {
        [Required]
        public string JWTSecret { get; set; }

        public int AccessTokenLifeTimeMinutes { get; set; }

        public int RefreshTokenLifeTimeDays { get; set; }
    }
}
