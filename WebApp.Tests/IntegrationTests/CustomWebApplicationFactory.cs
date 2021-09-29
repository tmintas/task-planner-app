using System;
using System.Linq;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.AspNetCore.TestHost;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.Extensions.DependencyInjection;
using Web.Migrations;
using Web.Models.Entities;
using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace WebApp.Tests.IntegrationTests
{
	public class CustomWebApplicationFactory<TEntryPoint> : WebApplicationFactory<TEntryPoint> where TEntryPoint : class
    {
		private readonly string connectionString = Guid.NewGuid().ToString();

		private readonly InMemoryDatabaseRoot databaseRoot = new InMemoryDatabaseRoot();

		public List<Todo> DbTodos { get; set; } = new List<Todo>
		{
			new Todo { Id = 1, Name = "First" },
			new Todo { Id = 2, Name = "Second" }
		};

		protected override IWebHostBuilder CreateWebHostBuilder()
		{
			return WebHost.CreateDefaultBuilder(null).UseStartup<TEntryPoint>();
		}

        protected override void ConfigureWebHost(IWebHostBuilder hostBuilder)
		{
            hostBuilder.ConfigureTestServices(services =>
            {
                services.AddScoped<UserManager<ApplicationUser>>();
                var descriptor = services.SingleOrDefault(d => d.ServiceType == typeof(DbContextOptions<AppDbContext>));

                if (descriptor != null)
                    services.Remove(descriptor);

				services.AddDbContext<AppDbContext>(options => options.UseInMemoryDatabase("testDB"));

                var dbContext = this.getDbContext(services);

                this.seedTestData(dbContext);
            });
		}

		private AppDbContext getDbContext(IServiceCollection services)
		{
			var serviceProvider = services.BuildServiceProvider();
			var scope = serviceProvider.CreateScope();
			var scopedServices = scope.ServiceProvider;
			var dbContext = scopedServices.GetRequiredService<AppDbContext>();

			return dbContext;
		}

		private void seedTestData(AppDbContext dbContext)
		{
			dbContext.Database.EnsureDeleted();

			foreach (var todo in DbTodos)
			{
				dbContext.ToDoItems.Add(todo);
			}

			dbContext.SaveChanges();
		}
    }
}
