using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;

namespace Domain.Extensions
{
    public static class ModelBuilderExtensions
    {
        public static void ConfigureProperties(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ImportanceType>(it =>
            {
                it.Property(p => p.Name)
                    .HasMaxLength(200);
            });

            modelBuilder.Entity<ToDoItem>(it =>
            {
                it.Property(p => p.Name)
                    .HasMaxLength(15)
                    .IsRequired();

                it.Property(p => p.Description)
                    .HasMaxLength(30);
            });
        }

        public static void Seed(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ImportanceType>().HasData(new[]
            {
                new ImportanceType
                {
                    Id = Enums.ImportanceType.High,
                    Name = Enums.ImportanceType.High.GetDisplayName()
                },
                new ImportanceType
                {
                    Id = Enums.ImportanceType.Middle,
                    Name = Enums.ImportanceType.Middle.GetDisplayName()
                },
                new ImportanceType
                {
                    Id = Enums.ImportanceType.Low,
                    Name = Enums.ImportanceType.Low.GetDisplayName()
                }
            });

            modelBuilder.Entity<ToDoItem>().HasData(
                new ToDoItem
                {
                    Id = 1,
                    Name = "testdbname",
                    Description = "testdbdesc",
                    ImportanceTypeId = Enums.ImportanceType.High,
                    Date = new DateTime(2019, 5, 1, 13, 0, 0)
                });
        }
    }
}
