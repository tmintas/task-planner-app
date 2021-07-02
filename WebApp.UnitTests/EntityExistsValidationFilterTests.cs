using Microsoft.EntityFrameworkCore;
using Web.Models.Entities;
using Web.Migrations;
using Xunit;
using Web.Middleware;
using Microsoft.AspNetCore.Mvc.Abstractions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Web.Controllers;
using AutoMapper;
using Microsoft.AspNetCore.Mvc.Filters;
using System.Collections.Generic;
using System;
using Moq;
using Web.Repositories.Contracts;

namespace WebApp.UnitTests
{
    public class EntityExistsValidationAttributeTests : IClassFixture<FilterFixture>
    {
        FilterFixture filterFixture;

        EntityExistsValidationFilter<Todo> SUT => filterFixture.EntityExistsValidationFilter;

        public EntityExistsValidationAttributeTests(FilterFixture filterFixture)
        {
            this.filterFixture = filterFixture;
        }

        [Fact]
        public void EntityExistsValidationAttribute_ShouldReturnBadRequestResult_IfIdIsZeroOrLess()
        {
            // arrange
            var badId = -1;
            var actionArguments = new Dictionary<string, object>() { { "id", badId } };
            var actionExecutingContext = GetActionExecutingContext(actionArguments);

            // act
            SUT.OnActionExecuting(actionExecutingContext);

            // assert
            Assert.IsType<BadRequestObjectResult>(actionExecutingContext.Result);

            var result = (BadRequestObjectResult)actionExecutingContext.Result;
            Assert.Equal(result.Value, $"Bad id argument value: {badId}");
        }

        [Fact]
        public void EntityExistsValidationAttribute_ShouldReturnNotFoundObjectResult_IfItemWithPassedIdIsNotPresentInDatabase()
        {
            // arrange
            var nonExistingId = 99;
            var actionArguments = new Dictionary<string, object>() { { "id", nonExistingId } };
            var actionExecutingContext = GetActionExecutingContext(actionArguments);

            // act
            SUT.OnActionExecuting(actionExecutingContext);

            // assert
            Assert.IsType<NotFoundObjectResult>(actionExecutingContext.Result);

            var result = (NotFoundObjectResult)actionExecutingContext.Result;
            Assert.Equal(result.Value, $"Entity of type { typeof(Todo).FullName } with id {nonExistingId} was not found in database");
        }

        [Fact]
        public void EntityExistsValidationAttribute_ShouldReturnNotFoundObjectResult_IfIdArgumentWasNotPassedToActionMethod()
        {
            // arrange
            var actionArguments = new Dictionary<string, object>();
            var actionExecutingContext = GetActionExecutingContext(actionArguments);

            // act
            SUT.OnActionExecuting(actionExecutingContext);

            // assert
            Assert.IsType<BadRequestObjectResult>(actionExecutingContext.Result);
        }

        [Fact]
        public async void EntityExistsValidationAttribute_ShouldSetItemToHttpContext_IfItemExistsInDatabase()
        {
            // arrange
            var existingItem = (await filterFixture.DbContext.ToDoItems.FirstAsync());
            var existingItemId = existingItem.Id;
            var actionArguments = new Dictionary<string, object>() { { "id", existingItemId }};
            var actionExecutingContext = GetActionExecutingContext(actionArguments);

            // act
            SUT.OnActionExecuting(actionExecutingContext);

            // assert
            Assert.True(actionExecutingContext.HttpContext.Items.ContainsKey("entity"));
            Assert.Equal(actionExecutingContext.HttpContext.Items["entity"], existingItem);
        }

        private ActionExecutingContext GetActionExecutingContext(IDictionary<string, object> actionArguments)
        {
            var actionContext = new ActionContext
            {
                HttpContext = new DefaultHttpContext(),
                RouteData = new RouteData(),
                ActionDescriptor = new ActionDescriptor()
            };

            var todoRepositoryMock = new Mock<IDatabaseRepository<Todo>>();
            var mapperMock = new Mock<IMapper>();
            var controller = new TodoController(todoRepositoryMock.Object, mapperMock.Object);

            return new ActionExecutingContext(
                actionContext,
                new List<IFilterMetadata>(),
                actionArguments,
                controller);
        }
    }

    public class FilterFixture : IDisposable
    {
        public AppDbContext DbContext { get; }

        public EntityExistsValidationFilter<Todo> EntityExistsValidationFilter { get; }

        public  FilterFixture()
        {
            var options = new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(databaseName: "TaskPlanner")
                .Options;

            DbContext = new AppDbContext(options);

            DbContext.ToDoItems.Add(new Todo { Id = 1, Name = "myTodo" });
            DbContext.SaveChanges();

            EntityExistsValidationFilter = new EntityExistsValidationFilter<Todo>(DbContext);
        }

        public void Dispose()
        {
            DbContext.Dispose();
        }
    }
}
