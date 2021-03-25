using Domain.Models;
using Domain.Requests;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using System;
using System.Threading.Tasks;
using Web.Services.Contracts;

namespace Web.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService authServce;
        private readonly IConfiguration configuration;

        public AuthController(IAuthService authServce, IConfiguration configuration)
        {
            this.authServce = authServce;
            this.configuration = configuration;

            //try
            //{
            //    this.authSettings = authSettings.Value;
            //}
            //catch (Exception ex)
            //{
            //    throw ex;
            //}
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
            if (!int.TryParse(this.configuration["AuthSettings:RefreshTokenLifeTimeDays"], out int refreshTokenLifetimeDays))
            {
                throw new Exception("Invalid settings value: RefreshTokenLifeTimeDays");
            }

            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Expires = DateTime.Now.AddDays(refreshTokenLifetimeDays)
            };

            Response.Cookies.Append("refreshToken", token, cookieOptions);
        }
    }
}
