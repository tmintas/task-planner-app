using System.Threading.Tasks;
using UserManagement.Models;

namespace Web.Services.Contracts
{
    public interface IUserService
    {
        public Task<ApplicationUser> GetCurrentUser();
    }
}
