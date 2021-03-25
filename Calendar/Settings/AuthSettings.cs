using System.ComponentModel.DataAnnotations;
using Web.Services.Contracts;

namespace Web.Settings
{
    public class AuthSettings : IValidatable
    {
        [Required(ErrorMessage = "AuthSettings.JWTSecret must not be null or empty")]
        public string JWTSecret { get; set; }

        [Required(ErrorMessage = "AuthSettings.AccessTokenLifeTimeMinutes must not be null or empty")]
        [Range(1, 1000, ErrorMessage = "AuthSettings.AccessTokenLifeTimeMinutes must be between 1 and 1000")]
        public int AccessTokenLifeTimeMinutes { get; set; }

        [Required(ErrorMessage = "AuthSettings.RefreshTokenLifeTimeDays must not be null or empty")]
        [Range(1, 10, ErrorMessage = "AuthSettings.RefreshTokenLifeTimeDays must be between 1 and 10")]
        public int RefreshTokenLifeTimeDays { get; set; }

        public void Validate()
        {
            Validator.ValidateObject(this, new ValidationContext(this), validateAllProperties: true);
        }
    }
}
 