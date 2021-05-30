using System.ComponentModel.DataAnnotations;
using Domain.DataTransferObjects;

namespace Domain.Requests
{
    public class AuthenticateRequest : IValidatableDto
    {
        [Required(ErrorMessage = "UserName is required")]
        [StringLength(40, ErrorMessage = "UserName length should be in rage 5 - 40 symbols", MinimumLength = 4)]
        public string UserName { get; set; }

        [Required(ErrorMessage = "Password is required")]
        [StringLength(40, ErrorMessage = "UserName length should be in rage 5 - 40 symbols", MinimumLength = 4)]
        public string Password { get; set; }
    }
}
