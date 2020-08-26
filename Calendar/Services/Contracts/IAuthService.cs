using Domain.Entities;
using Domain.Requests;
using Domain.Responses;
using System.Threading.Tasks;

namespace Web.Services.Contracts
{
    public interface IAuthService
    {
        Task<AuthenticateResponse> RefreshTokenAsync(string refreshTokenValue);

        Task<AuthenticateResponse> Login(LoginRequest model);

        Task<RegisterResponse> Register(RegistrationRequest model);
    }
}
