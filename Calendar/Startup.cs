using Infrastructure;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Text;
using UserManagement.Models;
using Web.Repositories;
using Web.Repositories.Contracts;
using Web.Services;
using Web.Services.Contracts;

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
            services.AddCors(options =>
            {
                options.AddPolicy("AllowAllPolicy",
                p => p.WithOrigins("http://localhost:4200/").SetIsOriginAllowed(o => true).AllowAnyMethod().AllowAnyHeader().AllowCredentials());
            });

            services.AddControllers();

            services.AddMvc()
                .AddJsonOptions(options => options.JsonSerializerOptions.PropertyNamingPolicy = null);

            services.Configure<ApiBehaviorOptions>(options =>
                options.SuppressModelStateInvalidFilter = true);

            services.AddDbContextPool<AppDbContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("DevConnection")));
            services.AddScoped<UserManager<ApplicationUser>>();
            services.AddScoped(typeof(IDatabaseRepository<>), typeof(SqlRepository<>));

            services.AddDefaultIdentity<ApplicationUser>()
                .AddEntityFrameworkStores<AppDbContext>();

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
            var key = Encoding.UTF8.GetBytes(Configuration["AuthSettings:JWT_Secret"].ToString());

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
