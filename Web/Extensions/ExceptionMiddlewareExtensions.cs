using System.Net;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Hosting;
using Web.Models.Shared;

namespace Web.Extensions
{
    public static class ExceptionMiddlewareExtensions
    {
        public static void ConfigureExceptionHandler(this IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseExceptionHandler(appBuilder => 
            {
                appBuilder.Run(async context => 
                {
                    context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                    context.Response.ContentType = "application/json";

                    var contextFeature = context.Features.Get<IExceptionHandlerFeature>();

                    if (contextFeature != null)
                    {
                        var exception = contextFeature.Error;

                        var errorDetails = new ErrorDetails
                        {
                            Message = "Something went wrong.",
                            StatusCode = context.Response.StatusCode
                        };

                        if (env.IsDevelopment())
                        {
                            errorDetails.Error = exception.ToString();
                            errorDetails.Message = exception.Message;
                            errorDetails.StackTrace = exception.StackTrace;
                        }

                        await context.Response.WriteAsync(errorDetails.ToString());
                    }
                });
            });
        }
    }
}