using System.Threading.Tasks;
using AutoMapper;
using Domain.Requests;
using Web.Models.Entities;
using Web.Repositories.Contracts;
using Web.Services.Contracts;

namespace Web.Services
{
    // TODO - add fetching of description in separate method, removefrom get all method
    public class TodoService : ITodoService
    {
        private readonly IDatabaseRepository<Todo> todoRepository;

        private readonly IMapper mapper;

        public TodoService(IDatabaseRepository<Todo> todoRepository, IMapper mapper)
        {
            this.todoRepository = todoRepository;
            this.mapper = mapper;

        }
        
        public async Task<TodoDto> AddAsync(TodoDto dto)
        {
            var todo = this.mapper.Map<Todo>(dto);

            await this.todoRepository.AddAsync(todo);

            dto = this.mapper.Map<TodoDto>(todo);

            return dto;
        }

        public Task<TodoDto> DeleteAsync(TodoDto dto)
        {
            throw new System.NotImplementedException();
        }

        public Task<TodoDto> Get(int id)
        {
            throw new System.NotImplementedException();
        }

        public Task<TodoDto> UpdateAsync(TodoDto dto)
        {
            throw new System.NotImplementedException();
        }
    }
}