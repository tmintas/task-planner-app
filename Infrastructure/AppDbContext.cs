using Domain;
using Domain.Entities;
using Domain.Extensions;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using UserManagement.Models;

namespace Infrastructure
{
    public class AppDbContext : IdentityDbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<ToDoItem> ToDoItems { get; set; }

        public DbSet<ImportanceType> ImportanceTypes { get; set; }
        
        public DbSet<IdentityUser> ApplicationUsers { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Seed();

            modelBuilder.Entity<RefreshToken>()
                .Property(rf => rf.Token)
                .HasColumnName("Token")
                .IsRequired();

            modelBuilder.Entity<RefreshToken>()
                .Property(rf => rf.ExpirationDate)
                .HasColumnName("ExpirationDate")
                .IsRequired();

            modelBuilder.Entity<RefreshToken>()
                 .Property(rf => rf.CreationDate)
                 .HasColumnName("CreationDate")
                 .IsRequired();

            modelBuilder.Entity<RefreshToken>()
                 .Property(rf => rf.RevokationDate)
                 .HasColumnName("RevokationDate")
                 .HasDefaultValue(null);

            modelBuilder.Entity<RefreshToken>()
                 .Property(rf => rf.ReplacedByToken)
                 .HasColumnName("ReplacedByToken")
                 .HasDefaultValue(null);

            // modelBuilder.Entity<ApplicationUser>()
            //      .HasMany(u => u.RefreshTokens)
            //      .WithOne(t => t.User);

            modelBuilder.Entity<RefreshToken>(rt => 
            {
                rt.HasOne(rt => rt.User)
                .WithMany(u => u.RefreshTokens)
                .HasForeignKey(rt => rt.UserId)
                .IsRequired();
            });
        }
    }
}
