using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;

namespace Domain.Extensions
{
    public static class ModelBuilderExtensions
    {
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

            var now = DateTime.Now;
            var currentYear = now.Year;
            var currentMonth = now.Month;

            modelBuilder.Entity<ToDoItem>().HasData(
                new ToDoItem
                {
                    Id = 1,
                    Name = "Go to walk",
                    Description = "Go somewhere",
                    ImportanceTypeId = Enums.ImportanceType.High,
                    Date = new DateTime(currentYear, currentMonth, 5, 18, 0, 0),
                    HasTime = true
                },
                new ToDoItem
                {
                    Id = 2,
                    Name = "Wash my cat",
                    Description = "I should wash him carefully",
                    ImportanceTypeId = Enums.ImportanceType.Middle,
                    Date = new DateTime(currentYear, currentMonth, 6, 13, 0, 0),
                    HasTime = true
                },
                new ToDoItem
                {
                    Id = 3,
                    Name = "Go to grocery shop",
                    Description = "Bread, milk, ice cream",
                    ImportanceTypeId = Enums.ImportanceType.Middle,
                    Date = new DateTime(currentYear, currentMonth, 6, 11, 0, 0),
                    HasTime = true
                },
                new ToDoItem
                {
                    Id = 4,
                    Name = "Undefinite action",
                    Description = "I don't even know",
                    ImportanceTypeId = Enums.ImportanceType.Low,
                    Date = new DateTime(currentYear, currentMonth, 6, 0, 0, 0),
                    HasTime = false
                }
            );
        }
    }
}
