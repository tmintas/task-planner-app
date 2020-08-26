using Domain.Models;
using System.Collections.Generic;

namespace Domain.Responses
{
    public class RegisterResponse
    {
        public bool Succeeded { get; set; }

        public List<RegisterError> Errors { get; set; }
    }
}
