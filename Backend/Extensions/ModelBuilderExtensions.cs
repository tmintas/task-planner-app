using Web.Enums;
using Microsoft.EntityFrameworkCore;
using System;
using Web.Entities;
using Web.Models.Entities;

namespace Web.Extensions
{
    public static class ModelBuilderExtensions
    {
        public static void Seed(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ImportanceType>().HasData(new[]
            {
                new ImportanceType
                {
                    Id = EImportanceTypeId.High,
                    Name = EImportanceTypeId.High.GetDisplayName()
                },
                new ImportanceType
                {
                    Id = EImportanceTypeId.Middle,
                    Name = EImportanceTypeId.Middle.GetDisplayName()
                },
                new ImportanceType
                {
                    Id = EImportanceTypeId.Low,
                    Name = EImportanceTypeId.Low.GetDisplayName()
                }
            });

            var now = DateTime.Now;
            var currentYear = now.Year;
            var currentMonth = now.Month;

            modelBuilder.Entity<Todo>().HasData(
                new Todo
                {
                    Id = 1,
                    Name = "Go to walk",
                    Description = "Go somewhere",
                    ImportanceTypeId = EImportanceTypeId.High,
                    Date = new DateTime(currentYear, currentMonth, 5, 18, 0, 0),
                    HasTime = true
                },
                new Todo
                {
                    Id = 2,
                    Name = "Wash my cat",
                    Description = "I should wash him carefully",
                    ImportanceTypeId = EImportanceTypeId.Middle,
                    Date = new DateTime(currentYear, currentMonth, 6, 13, 0, 0),
                    HasTime = true
                },
                new Todo
                {
                    Id = 3,
                    Name = "Go to grocery shop",
                    Description = "Bread, milk, ice cream",
                    ImportanceTypeId = EImportanceTypeId.Middle,
                    Date = new DateTime(currentYear, currentMonth, 6, 11, 0, 0),
                    HasTime = true
                },
                new Todo
                {
                    Id = 4,
                    Name = "Undefinite action",
                    Description = "I don't even know",
                    ImportanceTypeId = EImportanceTypeId.Low,
                    Date = new DateTime(currentYear, currentMonth, 6, 0, 0, 0),
                    HasTime = false
                }
            );
        }
    }
}
