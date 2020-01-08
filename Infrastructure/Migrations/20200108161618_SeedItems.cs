using Microsoft.EntityFrameworkCore.Migrations;
using System;

namespace Infrastructure.Migrations
{
    public partial class SeedItems : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
            table: "ToDoItems",
            columns: new[] { "Date", "Name", "Descriptionh", "Importance" },
            values: new object[] { DateTime.Now, "test", "dddd", 1 });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
