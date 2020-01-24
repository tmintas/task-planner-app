using Domain.Enums;
using Microsoft.EntityFrameworkCore;
using System;

namespace Domain.Extensions
{
    public static class ModelBuilderExtensions
    {
        public static void Seed(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ImportanceTypeDto>().HasData(new[]
            {
                new ImportanceTypeDto
                {
                    Id = ImportanceType.High,
                    Name =  ImportanceType.High.GetDisplayName()
                },
                new ImportanceTypeDto
                {
                    Id = ImportanceType.Middle,
                    Name = ImportanceType.Middle.GetDisplayName()
                },
                new ImportanceTypeDto
                {
                    Id = ImportanceType.Low,
                    Name = ImportanceType.Low.GetDisplayName()
                }
            });

            modelBuilder.Entity<ToDoItem>().HasData(
                new ToDoItem
                {
                    Id = 1,
                    Name = "testdbname",
                    Description = "testdbdesc",
                    ImportanceType = ImportanceType.High,
                    Date = new DateTime(2019, 5, 1, 13, 0, 0)
                });
        }
    }
}
