using Domain.Models;
using Domain.Requests;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using UserManagement.Models;

namespace Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ApplicationUserController : ControllerBase
    {
        private UserManager<IdentityUser> _userManager;
        private SignInManager<IdentityUser> _signInManager;
        private readonly IConfiguration _configuration;

        public ApplicationUserController(
            UserManager<IdentityUser> userManager, 
            SignInManager<IdentityUser> signInManager, 
            IConfiguration configuration
        ) {
            this._userManager = userManager;
            this._signInManager = signInManager;
            this._configuration = configuration;
        }

        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> PostApplicationUser(ApplicationUserDto model)
        {
            var appUser = new IdentityUser
            {
                Email = model.Email,
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
        public async Task<IActionResult> Login(ApplicationUserDto model)
        {
            var user = await _userManager.FindByNameAsync(model.UserName);
            
            if (user == null || !await _userManager.CheckPasswordAsync(user, model.Password))
            {
                return Ok(new { error = "Username or password is incorrect" });
            }
            else
            {
                var secret = _configuration.GetSection("ApplicationSettings:JWT_Secret").Value.ToString();
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes(secret);
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[]
                    {
                        new Claim(ClaimTypes.Name, user.Id.ToString())
                    }),
                    Expires = DateTime.UtcNow.AddHours(4),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                };

                var token = tokenHandler.CreateToken(tokenDescriptor);
                var encodedToken = tokenHandler.WriteToken(token);

                return Ok(new { token = encodedToken });

            }
        }

        [HttpGet]
        [Authorize]
        [Route("user-email")]
        public async Task<string> GetUserEmail()
        {
            var userId = User.Claims.First(c => c.Type == "UserId").Value;
            var user = await _userManager.FindByIdAsync(userId);

            return user.Email;
        }
    }
}