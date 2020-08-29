using Domain.Requests;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using Web.Services.Contracts;

namespace Web.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        // TODO move to appconfig
        private const int REFRESH_TOKEN_LIFETIME_DAYS = 7;

        private readonly IAuthService authServce;

        public AuthController(IAuthService authServce)
        {
            this.authServce = authServce;
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest model)
        {
            var loginResult = await authServce.Login(model);

            // TODO probably it is not OK
            if (loginResult == null) return BadRequest(new { error = "Username or password is incorrect" });

            setTokenCookie(loginResult.RefreshToken);

            return Ok(loginResult);
        }

        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register([FromBody] RegistrationRequest model)
        {
            var result = await authServce.Register(model);

            return Ok(result);
        }

        [HttpGet("refresh-token")]
        public async Task<IActionResult> RefreshToken()
        {
            var oldRefreshToken = Request.Cookies["refreshToken"];
            var response = await authServce.RefreshTokenAsync(oldRefreshToken);

            if (response == null)
            {
                return Unauthorized(new { message = "Invalid token" });
            }

            // store refresh token in cookies
            setTokenCookie(response.RefreshToken);

            return Ok(new { accessToken = response.AccessToken });
        }

        private void setTokenCookie(string token)
        {
            var cookieOptions = new CookieOptions
            {
                HttpOnly = false,
                IsEssential = true,
                Expires = DateTime.Now.AddDays(REFRESH_TOKEN_LIFETIME_DAYS)
            };

            Response.Cookies.Append("refreshToken", token, cookieOptions);
        }
    }
}
