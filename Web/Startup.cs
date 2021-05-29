using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Microsoft.EntityFrameworkCore;
using Web.Middleware;
using Web.Repositories;
using Web.Repositories.Contracts;
using Web.Services;
using Web.Services.Contracts;
using Web.Settings;
using Web.Models.Entities;
using Web.Migrations;
using Web.Extensions;

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
            // bind settings configs to stronglt typed objects
            services.Configure<AuthSettings>(Configuration.GetSection("AuthSettings"));
            services.Configure<ConnectionStringSettings>(Configuration.GetSection("ConnectionStrings"));

            // explicitly register singleton settings objects to avoid using IOptions<T> while injecting
            services.AddSingleton(resolver => resolver.GetRequiredService<IOptions<AuthSettings>>().Value);
            services.AddSingleton(resolver => resolver.GetRequiredService<IOptions<ConnectionStringSettings>>().Value);

            // register stronlgy typed app settings as an IValidatable, so they can be validated using startup filters
            services.AddSingleton<IValidatable>(resolver => resolver.GetRequiredService<IOptions<AuthSettings>>().Value);
            services.AddSingleton<IValidatable>(resolver => resolver.GetRequiredService<IOptions<ConnectionStringSettings>>().Value);

            // register filter to add runtime settings object validation
            // this is done to prevent app from startup if any of config validation errors happens
            services.AddTransient<IStartupFilter, SettingValidationStartupFilter>();

            // add cors policy
            services.AddCors(options =>
            {
                options.AddPolicy("AllowAllPolicy",
                policyBuilder => policyBuilder
                    .WithOrigins("http://localhost:4200/")
                    .SetIsOriginAllowed(o => true)
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials());
            });

            services.AddControllers();

            // cancel transforming to camelCase. Pascal case is used in Angular models
            services
                .AddMvc()
                .AddJsonOptions(options => options.JsonSerializerOptions.PropertyNamingPolicy = null);

            // disable automatic http 400 resonses to be able to use custom validation filters
            services.Configure<ApiBehaviorOptions>(options => options.SuppressModelStateInvalidFilter = true);

            // add model validation middleware filter
            services.AddScoped<ModelValidationFilter>();

            // add generic entity exists validation filter 
            services.AddScoped<EntityExistsValidationFilter<Todo>>();

            // configure identity
            services.AddScoped<UserManager<ApplicationUser>>();
            services
                .AddDefaultIdentity<ApplicationUser>()
                .AddEntityFrameworkStores<AppDbContext>();

            services.Configure<IdentityOptions>(
                options =>
                {
                    options.Password.RequireDigit = false;
                    options.Password.RequireNonAlphanumeric = false;
                    options.Password.RequireLowercase = false;
                    options.Password.RequireUppercase = false;
                    options.Password.RequiredLength = 4;
                });

            // add services
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IAuthService, AuthService>();
            services.AddScoped(typeof(IDatabaseRepository<>), typeof(SqlRepository<>));

            // connection string configuration
            services.AddDbContextPool<AppDbContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("DevConnection")));

            // auth configuration
            services
                .AddAuthentication(x =>
                {
                    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                    x.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
                })
                .AddJwtBearer();

            // configure JWT bearer options using separate class to inject stronly type AuthSettings object there
            services.ConfigureOptions<ConfigureJWTBearerOptions>();
            services.ConfigureOptions<ConnectionStringOptions>();

            // TODO research
            services.AddHttpContextAccessor();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, UserManager<ApplicationUser> userManager)
        {
            // if (env.IsDevelopment())
            // {
            //     app.UseDeveloperExceptionPage();
            // }
            //app.UseHttpsRedirection();

            //app.UseExceptionHandler(a => a.Run(async context =>
            //{
            //    var exceptionHandlingFeature = context.Features.Get<IExceptionHandlerPathFeature>();
            //    var exception = exceptionHandlingFeature.Error;

            //    context.Response.ContentType = "application/json";
            //    var result = JsonConvert.SerializeObject(new { errMessage = exception.Message, stackTrace = exception.StackTrace, requestMethod = context.Request.Method });

            //    await context.Response.WriteAsync(result);
            //}));

            // configure global exception handling
            app.ConfigureExceptionHandler(env);

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
