using Domain.Entities;
using Domain.Requests;
using Domain.Responses;
using Infrastructure;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using UserManagement.Models;
using Web.Services.Contracts;

namespace Web.Services
{
    public class AuthService : IAuthService
    {
        private readonly IConfiguration configuration;
        private readonly UserManager<ApplicationUser> userManager;

        public AuthService(UserManager<ApplicationUser> userManager, IConfiguration configuration)
        {
            this.userManager = userManager;
            this.configuration = configuration;
        }

        public async Task<AuthenticateResponse> Login(LoginRequest model)
        {
            var user = userManager.Users.Include(u => u.RefreshTokens).FirstOrDefault(u => u.UserName == model.UserName);

            if (user == null || !await userManager.CheckPasswordAsync(user, model.Password))
            {
                return null;
            }

            var accessToken = generateAccessToken(user);
            var refreshToken = generateRefreshToken();

            user.RefreshTokens = user.RefreshTokens ?? new List<RefreshToken>();
            user.RefreshTokens.Add(refreshToken);
            await userManager.UpdateAsync(user);

            return new AuthenticateResponse(user, accessToken, refreshToken.Token);
        }

        public async Task<RegisterResponse> Register(RegistrationRequest model)
        {
            var result = new RegisterResponse();
            var appUser = new ApplicationUser
            {
                UserName = model.UserName
            };

            try
            {
                var userCreationResult = await userManager.CreateAsync(appUser, model.Password);
            }
            catch (Exception ex)
            {
                throw ex;
            }

            result.Succeeded = true;

            return result;
        }

        public async Task<AuthenticateResponse> RefreshTokenAsync(string oldRefreshTokenValue)
        {
            var user = userManager.Users
                .Include(u => u.RefreshTokens)
                .FirstOrDefault(u => u.RefreshTokens.Any(rt => rt.Token == oldRefreshTokenValue));

            if (user == null) return null;

            var oldRefreshToken = user.RefreshTokens.FirstOrDefault(rt => rt.Token == oldRefreshTokenValue);
            var newRefreshToken = generateRefreshToken();

            oldRefreshToken.RevokationDate = DateTime.Now;
            oldRefreshToken.ReplacedByToken = newRefreshToken.Token;

            user.RefreshTokens.Add(newRefreshToken);
            await userManager.UpdateAsync(user);

            var accessToken = generateAccessToken(user);

            return new AuthenticateResponse(user, accessToken, newRefreshToken.Token);
        }

        private string generateAccessToken(ApplicationUser user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();

            var key = Encoding.UTF8.GetBytes(this.configuration["AuthSettings:JWT_Secret"].ToString());
            var securityKey = new SymmetricSecurityKey(key);

            if (!int.TryParse(this.configuration["AuthSettings:AccessTokenLifeTimeMinutes"], out int accessTokenLifetimeMinutes))
            {
                throw new Exception("Invalid settings value: AccessTokenLifeTimeMinutes");
            }

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString())
                }),
                Expires = DateTime.UtcNow.AddMinutes(accessTokenLifetimeMinutes),
                SigningCredentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }

        private RefreshToken generateRefreshToken()
        {
            using(var rngCryptoServiceProvider = new RNGCryptoServiceProvider())
            {
                var randomBytes = new byte[64];
                rngCryptoServiceProvider.GetBytes(randomBytes);

                return new RefreshToken
                {
                    Token = Convert.ToBase64String(randomBytes),
                    ExpirationDate = DateTime.UtcNow.AddDays(7),
                    CreationDate = DateTime.UtcNow
                };
            }
        }
    }
}
