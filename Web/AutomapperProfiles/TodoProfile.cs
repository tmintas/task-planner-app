using AutoMapper;
using Domain.Requests;
using Web.Models.Entities;

namespace Web.AutomapperProfiles
{
    public class TodoProfile : Profile
    {
        public TodoProfile()
        {
            CreateMap<Todo, TodoDto>();
            CreateMap<TodoDto, Todo>().ForMember(dest => dest.Id, opt => opt.Ignore());
        }
    }
}