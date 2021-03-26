using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Text;

namespace Web.Settings
{
    public class ConfigureJWTBearerOptions : IConfigureNamedOptions<JwtBearerOptions>
    {
        readonly AuthSettings authSettings;

        public ConfigureJWTBearerOptions(AuthSettings authSettings)
        {
            this.authSettings = authSettings;
        }

        public void Configure(string name, JwtBearerOptions options)
        {
            var key = Encoding.UTF8.GetBytes(authSettings.JWTSecret);

            options.RequireHttpsMetadata = false;
            options.SaveToken = false;
            options.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuer = false,
                ValidateAudience = false,
                ClockSkew = TimeSpan.Zero
            };

        }

        public void Configure(JwtBearerOptions options)
        {
            Configure(Options.DefaultName, options);
        }
    }
}
