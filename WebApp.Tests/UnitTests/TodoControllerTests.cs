using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using AutoMapper;
using Domain.Requests;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Web.Controllers;
using Web.Models.Entities;
using Web.Repositories.Contracts;
using Xunit;

namespace WebApp.Tests.UnitTests
{
	public class TodoControllerTests
    {
		private string userId => "1";

		[Fact]
		public async void GetUserTodos_ShouldReturnTodosBelongingToLoggedInUserAndMapToDtos()
		{
			// arrange
			var userTodoId = 1;
			var userTodo = new Todo { Id = userTodoId, Name = "userTodo", UserId = userId };
			var notUserTodo = new Todo { Id = 2, Name = "notUserTodo", UserId = "2" };
			var allTodos = new List<Todo> { userTodo, notUserTodo };

			var todoRepositoryMock = new Mock<IDatabaseRepository<Todo>>();
			todoRepositoryMock.Setup(t => t.GetAllAsync()).ReturnsAsync(allTodos);

			var mapperMock = new Mock<IMapper>();
			mapperMock.Setup(m => m
				.Map<TodoDto>(It.IsAny<Todo>()))
				.Returns(new TodoDto { Id = userTodo.Id });

			var sut = this.SetupSut(todoRepositoryMock, mapperMock);

			// act
			var actionResult = await sut.GetUserTodos();

			// assert
			var result = (actionResult.Result as OkObjectResult);
			Assert.NotNull(result);

			var todoDtos = result.Value as IEnumerable<TodoDto>;
			Assert.NotNull(todoDtos);

			mapperMock.Verify(m => m.Map<TodoDto>(It.IsAny<Todo>()), Times.Once);
			Assert.Equal(todoDtos.Count(), 1);
			Assert.Equal((todoDtos.First()).Id, userTodoId);
		}

		private TodoController SetupSut(Mock<IDatabaseRepository<Todo>> todoRepositoryMock, Mock<IMapper> mapperMock)
		{
			var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[]
			{
				new Claim(ClaimTypes.NameIdentifier, userId)
			}));

			var sut = new TodoController(todoRepositoryMock.Object, mapperMock.Object);
			sut.ControllerContext = new ControllerContext()
			{
				HttpContext = new DefaultHttpContext() { User = user }
			};

			return sut;
		}
    }
}
