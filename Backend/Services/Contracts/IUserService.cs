using System.Threading.Tasks;
using Web.Models.Entities;

namespace Web.Services.Contracts
{
    public interface IUserService
    {
        Task<ApplicationUser> GetCurrentUser();
    }
}
