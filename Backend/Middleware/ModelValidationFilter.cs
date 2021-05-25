using Microsoft.AspNetCore.Mvc.Filters;
using System.Linq;
using Domain.DataTransferObjects;
using Microsoft.AspNetCore.Mvc;

namespace Web.Middleware
{
    /// <summary>
    /// validates input DTO object for all controller actions with applied ModelValidationFilter attribute
    /// </summary>
    public class ModelValidationFilter : IActionFilter
    {
        public void OnActionExecuting(ActionExecutingContext context)
        {
            var dto = context.ActionArguments.FirstOrDefault(arg => arg.Value is IValidatableDto);

            if (dto.Value == null)
            {
                context.Result = new BadRequestObjectResult("Provided action object should not be null");

                return;
            }

            if (!context.ModelState.IsValid)
            {
                context.Result = new BadRequestObjectResult(context.ModelState);

                return;
            }
        }

        public void OnActionExecuted(ActionExecutedContext context) { }
    }
}
