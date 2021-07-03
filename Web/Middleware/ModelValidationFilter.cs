using Microsoft.AspNetCore.Mvc.Filters;
using System.Linq;
using Domain.DataTransferObjects;
using Microsoft.AspNetCore.Mvc;

namespace Web.Middleware
{
    /// <summary>
    /// validates controller action argument which inherits IValidatableDto
    /// </summary>
    public class ModelValidationFilter : IActionFilter
    {
        public void OnActionExecuting(ActionExecutingContext context)
        {
            var dto = context.ActionArguments.FirstOrDefault(arg => arg.Value is IValidatableDto);

            if (!context.ModelState.IsValid)
            {
                context.Result = new BadRequestObjectResult(context.ModelState);

                return;
            }
        }

        public void OnActionExecuted(ActionExecutedContext context) { }
    }
}
