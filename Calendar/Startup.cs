using Infrastructure;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using Microsoft.EntityFrameworkCore;
using System.Text;
using UserManagement.Models;
using Web.Middleware;
using Web.Repositories;
using Web.Repositories.Contracts;
using Web.Services;
using Web.Services.Contracts;
using Web.Settings;

namespace Calendar
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            //services.AddOptions();
            //services
            //     .AddOptions<AuthSettings>()
            //     .Bind(Configuration.GetSection("AuthSettings"))
            //     //.PostConfigure(x =>
            //     //{
            //     //    var validationResults = new List<ValidationResult>();
            //     //    var context = new ValidationContext(x);
            //     //    var isValid = Validator.TryValidateObject(x, context, validationResults);

            //     //    if (isValid) return;

            //     //    var msg = string.Join("\n", validationResults.Select(vr => vr.ErrorMessage));

            //     //    throw new Exception("inval");

            //     //});
            //     .ValidateDataAnnotations();

            services.AddCors(options =>
            {
                options.AddPolicy("AllowAllPolicy",
                p => p.WithOrigins("http://localhost:4200/").SetIsOriginAllowed(o => true).AllowAnyMethod().AllowAnyHeader().AllowCredentials());
            });

            services.AddControllers();

            // cancel transforming to camelCase. Pascal case is used in Angular models
            services.AddMvc()
                .AddJsonOptions(options => options.JsonSerializerOptions.PropertyNamingPolicy = null);

            // this line allows to pass null object to controller methods instead of validation errors
            services.Configure<ApiBehaviorOptions>(options =>
                options.SuppressModelStateInvalidFilter = true);

            services.AddDbContextPool<AppDbContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("DevConnection")));
            services.AddScoped<UserManager<ApplicationUser>>();
            services.AddScoped(typeof(IDatabaseRepository<>), typeof(SqlRepository<>));

            services.AddDefaultIdentity<ApplicationUser>()
                .AddEntityFrameworkStores<AppDbContext>();

            // register filter to add runtime settings object validation
            // if this is not done, incorrect settings object will still be allowed for app to startup
            services.AddTransient<IStartupFilter, SettingValidationStartupFilter>();

            // configure stronly typed settings object
            services.Configure<AuthSettings>(Configuration.GetSection("AuthSettings"));

            // explicitly registed the settings object to avoid using IOptions<T> while injecting
            services.AddSingleton(resolver => resolver.GetRequiredService<IOptions<AuthSettings>>().Value);

            // register as an IValidatable
            services.AddSingleton<IValidatable>(resolver => resolver.GetRequiredService<IOptions<AuthSettings>>().Value);

            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IAuthService, AuthService>();
            services.Configure<IdentityOptions>(
                options =>
                {
                    options.Password.RequireDigit = false;
                    options.Password.RequireNonAlphanumeric = false;
                    options.Password.RequireLowercase = false;
                    options.Password.RequireUppercase = false;
                    options.Password.RequiredLength = 4;
                });

            // JWT Auth
            var key = Encoding.UTF8.GetBytes(Configuration["AuthSettings:JWTSecret"].ToString());

            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(x =>
            {
                x.RequireHttpsMetadata = false;
                x.SaveToken = false;
                x.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ClockSkew = TimeSpan.Zero
                };
            });

            services.AddHttpContextAccessor();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, UserManager<ApplicationUser> userManager)
        {
            //app.UseHttpsRedirection();


            //app.UseExceptionHandler(a => a.Run(async context =>
            //{
            //    var exceptionHandlingFeature = context.Features.Get<IExceptionHandlerPathFeature>();
            //    var exception = exceptionHandlingFeature.Error;

            //    context.Response.ContentType = "application/json";
            //    var result = JsonConvert.SerializeObject(new { errMessage = exception.Message, stackTrace = exception.StackTrace, requestMethod = context.Request.Method });

            //    await context.Response.WriteAsync(result);
            //}));

            app.UseRouting();
            app.UseCors("AllowAllPolicy");

            app.UseAuthentication();
            app.UseAuthorization();

            //app.Use(async (context, next) =>
            //{
            //    await next();

            //    if (!Path.HasExtension(context.Request.Path) && context.Response.StatusCode == 404)
            //    {
            //        context.Request.Path = "/index.html";
            //        await next();
            //    }
            //});

            app.UseDefaultFiles();
            app.UseStaticFiles();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
