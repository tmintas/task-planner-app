using Domain;
using System.Threading.Tasks;

namespace Web.Contracts
{
    public interface IToDoService
    {
        Task<ToDoItem> GetById(int id);
    }
}
