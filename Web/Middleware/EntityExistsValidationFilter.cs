using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System.Linq;
using Web.Migrations;
using Web.Models.Entities;

namespace Web.Middleware
{
    public class EntityExistsValidationFilter<T> : IActionFilter where T : EntityBase
    {
        private readonly AppDbContext dbContext;

        public EntityExistsValidationFilter(AppDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public void OnActionExecuting(ActionExecutingContext context)
        {
			// if (!context.ActionArguments.ContainsKey("id"))
            // {
            //     context.Result = new BadRequestObjectResult("id argument of controller action should be specified");

            //     return;
            // }
            var id = (int)context.ActionArguments["id"];

            if (id < 1)
            {
                context.Result = new BadRequestObjectResult($"Bad id argument value: {id}");

                return;
            }

            var entity = dbContext.Set<T>().FirstOrDefault(e => e.Id == id);

            if (entity == null)
            {
                context.Result = new NotFoundObjectResult($"Entity of type { typeof(T).FullName } with id {id} was not found in database");
            }
            else
            {
                context.HttpContext.Items.Add("entity", entity);
            }
        }

        public void OnActionExecuted(ActionExecutedContext context) { }
    }
}
