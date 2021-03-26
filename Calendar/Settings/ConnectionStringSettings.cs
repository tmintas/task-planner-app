using System.ComponentModel.DataAnnotations;
using Web.Services.Contracts;

namespace Web.Settings
{
    public class ConnectionStringSettings : IValidatable
    {
        [Required(ErrorMessage = "ConnectionStrings.DevConnection must not be null or empty")]
        public string DevConnection { get; set; }

        public void Validate()
        {
            Validator.ValidateObject(this, new ValidationContext(this), validateAllProperties: true);
        }
    }
}
