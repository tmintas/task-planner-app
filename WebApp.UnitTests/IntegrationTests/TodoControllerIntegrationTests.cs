using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using Calendar;
using Domain.Requests;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using Web.Enums;
using Web.Models.Entities;
using Xunit;

namespace WebApp.UnitTests.IntegrationTests
{
	public class TodoControllerIntegrationTests
    {
        private static readonly CustomWebApplicationFactory<Startup> WebApplicationFactory = new CustomWebApplicationFactory<Startup>();

		private static List<Todo> DbTodos => WebApplicationFactory.DbTodos;

		private static HttpClient AuthorizedClient;

		private static HttpClient UnauthorizedClient;

		public TodoControllerIntegrationTests()
		{
			UnauthorizedClient = WebApplicationFactory.CreateClient();
			AuthorizedClient = WebApplicationFactory.CreateClient();

			var encodedKey = Encoding.UTF8.GetBytes("1234567890123456");
            var securityKey = new SymmetricSecurityKey(encodedKey);
            var accessTokenLifetimeMinutes = 100;

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Expires = DateTime.UtcNow.AddMinutes(accessTokenLifetimeMinutes),
                SigningCredentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256Signature)
            };

            var tokenHandler = new JwtSecurityTokenHandler();
			var token = tokenHandler.WriteToken(tokenHandler.CreateToken(tokenDescriptor));
            AuthorizedClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue(JwtBearerDefaults.AuthenticationScheme, token);
		}

        [Fact]
        public async Task GetTodos_Returns401_WhenUserIsNotAuthenticated()
        {
            // act
            var httpResponse = await UnauthorizedClient.GetAsync("/api/Todo/1");

            // assert
            var stringResponse = await httpResponse.Content.ReadAsStringAsync();

			Assert.Equal(httpResponse.StatusCode, HttpStatusCode.Unauthorized);
        }

        [Fact]
        public async Task GetTodos_Returns500_WhenItemIsPresentInDb()
        {
			// act
			var todoId = DbTodos.First().Id;
            var httpResponse = await AuthorizedClient.GetAsync($"/api/Todo/{todoId}");

            // assert
            httpResponse.EnsureSuccessStatusCode();

            var stringResponse = await httpResponse.Content.ReadAsStringAsync();
            var todo = JsonConvert.DeserializeObject<TodoDto>(stringResponse);

			Assert.NotNull(todo);
        }

        [Fact]
        public async Task GetTodos_Returns404_WhenItemIsNotPresentInDb()
        {
			// act
			var todoId = 999;
            var httpResponse = await AuthorizedClient.GetAsync($"/api/Todo/{todoId}");

            // assert
            Assert.Equal(httpResponse.StatusCode, HttpStatusCode.NotFound);
        }

		[Fact]
        public async Task GetTodos_Returns400_WhenIdIsIncorrect()
        {
			// act
			var todoId = -1;
            var httpResponse = await AuthorizedClient.GetAsync($"/api/Todo/{todoId}");

            // assert
            Assert.Equal(httpResponse.StatusCode, HttpStatusCode.BadRequest);
        }

		[Fact]
        public async Task PostTodo_Returns201_WhenItemIsValidAndNotPresentInDatabase()
        {
			// act
			var todoDto = new TodoDto {
				Id = 3,
				Name = "new",
				ImportanceTypeId = EImportanceTypeId.Low,
				Date = new DateTime(2020, 5, 5),
				HasTime = false
			};

			var content = new StringContent(JsonConvert.SerializeObject(todoDto), Encoding.Default, "application/json");
            var httpResponse = await AuthorizedClient.PostAsync($"/api/Todo", content);

            // assert
            Assert.Equal(httpResponse.StatusCode, HttpStatusCode.Created);
        }
    }
}
