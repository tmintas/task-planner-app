using System.Collections.Generic;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Abstractions;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Routing;
using Moq;
using Web.Controllers;
using Web.Middleware;
using Web.Models.Entities;
using Web.Repositories.Contracts;
using Xunit;

namespace WebApp.UnitTests
{
	public class ModelValidationFilterTests
    {
        [Fact]
		public void ModelValidationFilter_ShouldReturnBadRequestObjectResult_WhenModelStateIsInvalid()
		{
            // arrange
            var actionArguments = new Dictionary<string, object>() { };
            var actionContext = new ActionContext
            {
                HttpContext = new DefaultHttpContext(),
                RouteData = new RouteData(),
                ActionDescriptor = new ActionDescriptor()
            };

            var todoRepositoryMock = new Mock<IDatabaseRepository<Todo>>();
            var mapperMock = new Mock<IMapper>();
            var controller = new TodoController(todoRepositoryMock.Object, mapperMock.Object);

            var actionExecutingContext = new ActionExecutingContext(
                actionContext,
                new List<IFilterMetadata>(),
                actionArguments,
                controller);

			var SUT = new ModelValidationFilter();
			var errorMessage = "errorMessage";

			actionExecutingContext.ModelState.AddModelError("errorKey", errorMessage);

            // act
            SUT.OnActionExecuting(actionExecutingContext);

            // assert
			var actionResult = actionExecutingContext.Result;
            Assert.IsType<BadRequestObjectResult>(actionResult);
		}
    }
}
