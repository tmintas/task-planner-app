using System.Collections.Generic;
using Web.Models.Shared;

namespace Domain.Responses
{
    public class RegisterResponse
    {
        public bool Succeeded { get; set; }

        public List<RegisterError> Errors { get; set; }
    }
}
