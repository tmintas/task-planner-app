using Domain.Requests;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using Web.Middleware;
using Web.Services.Contracts;
using Web.Settings;

namespace Web.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService authServce;

        private readonly AuthSettings authSettings;

        public AuthController(IAuthService authServce, AuthSettings authSettings)
        {
            this.authServce = authServce;
            this.authSettings = authSettings;
        }

        [HttpPost]
        [Route("login")]
        [ServiceFilter(typeof(ModelValidationFilter))]
        public async Task<IActionResult> Login([FromBody] LoginRequest model)
        {
            var loginResult = await authServce.Login(model);

            if (loginResult == null)
                return BadRequest(new { error = "Username or password is incorrect" });

            setTokenCookie(loginResult.RefreshToken);

            return Ok(loginResult);
        }

        [HttpPost]
        [Route("register")]
        [ServiceFilter(typeof(ModelValidationFilter))]
        public async Task<IActionResult> Register([FromBody] RegistrationRequest model)
        {
            var result = await authServce.Register(model);

            if (!result.Succeeded)
                return BadRequest(new { error = $"User with username {model.UserName} already exists!"} );

            return Ok(result);
        }

        [HttpGet("refresh-token")]
        [Authorize]
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
                HttpOnly = true,
                Expires = DateTime.Now.AddDays(authSettings.RefreshTokenLifeTimeDays)
            };

            Response.Cookies.Append("refreshToken", token, cookieOptions);
        }
    }
}
