using Domain.Requests;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Linq;
using System.Threading.Tasks;
using UserManagement.Models;

namespace Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private UserManager<ApplicationUser> _userManager;
        private SignInManager<ApplicationUser> _signInManager;
        private readonly IConfiguration _configuration;

        public UserController(
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            IConfiguration configuration
        )
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _configuration = configuration;
        }

        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register(RegistrationRequest model)
        {
            var appUser = new ApplicationUser
            {
                UserName = model.UserName
            };

            try
            {
                var result = await _userManager.CreateAsync(appUser, model.Password);

                return Ok(result);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login(LoginRequest model)
        {
            var users = _userManager.Users.FirstOrDefault();
            var user = await _userManager.FindByNameAsync(model.UserName);

            if (user == null || !await _userManager.CheckPasswordAsync(user, model.Password))
            {
                return Ok(new { error = "Username or password is incorrect" });
            }

            return Ok();
        }

        [HttpGet]
        [Authorize]
        [Route("user-name")]
        public async Task<string> GetUserName()
        {
            var userId = User.Claims.First(c => c.Type == "UserId").Value;
            var user = await _userManager.FindByIdAsync(userId);

            return user.UserName;
        }

        //[AllowAnonymous]
        //[HttpPost("refresh-token")]
        //public IActionResult RefreshToken(string token)
        //{
        //    var refreshToken = Request.Cookies["refreshToken"];

        //    AuthenticateResponse authResponse = userServ

        //    var user = _userManager.Users.FirstOrDefault(u => u.RefreshTokens.Any(rt => rt.Token == token));

        //    if (user == null) return null;

        //    var tokenToRefresh = user.RefreshTokens.FirstOrDefault(rt => rt.Token == token);

        //    if (!tokenToRefresh.IsValid) return null;


        //}
    }
}