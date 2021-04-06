//using Domain;
//using Domain.Entities;
//using Domain.Extensions;
//using Microsoft.AspNetCore.Identity;
//using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
//using Microsoft.EntityFrameworkCore;
//using UserManagement.Models;

//namespace Infrastructure
//{
//    public class AppDbContext : IdentityDbContext<ApplicationUser>
//    {
//        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

//        public DbSet<ToDoItem> ToDoItems { get; set; }

//        public DbSet<ImportanceType> ImportanceTypes { get; set; }
        
//        public DbSet<ApplicationUser> ApplicationUsers { get; set; }

//        protected override void OnModelCreating(ModelBuilder modelBuilder)
//        {
//            base.OnModelCreating(modelBuilder);

//            modelBuilder.Seed();

//            modelBuilder.Entity<RefreshToken>()
//                .Property(rf => rf.Token)
//                .HasColumnName("Token")
//                .IsRequired();

//            modelBuilder.Entity<RefreshToken>()
//                .Property(rf => rf.ExpirationDate)
//                .HasColumnName("ExpirationDate")
//                .IsRequired();

//            modelBuilder.Entity<RefreshToken>()
//                 .Property(rf => rf.CreationDate)
//                 .HasColumnName("CreationDate")
//                 .IsRequired();

//            modelBuilder.Entity<RefreshToken>()
//                 .Property(rf => rf.RevokationDate)
//                 .HasColumnName("RevokationDate")
//                 .HasDefaultValue(null);

//            modelBuilder.Entity<RefreshToken>()
//                 .Property(rf => rf.ReplacedByToken)
//                 .HasColumnName("ReplacedByToken")
//                 .HasDefaultValue(null);

//            modelBuilder.Entity<ToDoItem>()
//                 .HasOne(t => t.User)
//                 .WithMany(u => u.Todos)
//                 .HasForeignKey(t => t.UserId);

//            modelBuilder.Entity<RefreshToken>(rt => 
//            {
//                rt.HasOne(rt => rt.User)
//                .WithMany(u => u.RefreshTokens)
//                .HasForeignKey(rt => rt.UserId)
//                .IsRequired();
//            });
//        }
//    }
//}
