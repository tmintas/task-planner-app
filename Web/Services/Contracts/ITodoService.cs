using System.Threading.Tasks;
using Domain.Requests;

namespace Web.Services.Contracts
{
    public interface ITodoService
    {
        Task<TodoDto> AddAsync(TodoDto dto);
        
        Task<TodoDto> UpdateAsync(TodoDto dto);

        Task<TodoDto> DeleteAsync(TodoDto dto);

        Task<TodoDto> Get(int id);
    }
}