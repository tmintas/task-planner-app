using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using System;
using System.Collections.Generic;
using Web.Services.Contracts;

namespace Web.Middleware
{
    /// <summary>
    /// Validates all strongly typed app settigns which implement IValidatable interface during app startup
    /// </summary>
    public class SettingValidationStartupFilter : IStartupFilter
    {
        readonly IEnumerable<IValidatable> validatableObjects;

        public SettingValidationStartupFilter(IEnumerable<IValidatable> validatableObjects)
        {
            this.validatableObjects = validatableObjects;
        }

        public Action<IApplicationBuilder> Configure(Action<IApplicationBuilder> next)
        {
            foreach (var validatableObect in validatableObjects)
            {
                validatableObect.Validate();
            }

            return next;
        }
    }
}
