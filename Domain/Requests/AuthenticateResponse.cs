using System.Text.Json.Serialization;
using UserManagement.Models;

namespace Domain.Requests
{
    public class AuthenticateResponse
    {
        public string UserId { get; set; }

        public string Username { get; set; }

        public string AccessToken { get; set; }

        [JsonIgnore] // refresh token is returned in http only cookie
        public string RefreshToken { get; set; }

        public AuthenticateResponse(ApplicationUser user, string accessToken, string refreshToken)
        {
            UserId = user.Id;
            Username = user.UserName;
            AccessToken = accessToken;
            RefreshToken = refreshToken;
        }
    }
}
