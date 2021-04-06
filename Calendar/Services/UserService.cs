using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;
using Web.Models.Entities;
using Web.Services.Contracts;

namespace Web.Services
{
    public class UserService : IUserService
    {
        private readonly IHttpContextAccessor accessor;
        private readonly UserManager<ApplicationUser> userManager;

        public UserService(IHttpContextAccessor accessor, UserManager<ApplicationUser> userManager)
        {
            this.accessor = accessor;
            this.userManager = userManager;
        }

        public async Task<ApplicationUser> GetCurrentUser()
        {
            var claimsPrincipal = accessor.HttpContext.User;
            var user = await userManager.GetUserAsync(claimsPrincipal);

            return user;
        }
    }
}
