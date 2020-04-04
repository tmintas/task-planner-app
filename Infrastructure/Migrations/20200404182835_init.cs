using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Infrastructure.Migrations
{
    public partial class init : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ImportanceTypes",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false),
                    Name = table.Column<string>(maxLength: 20, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ImportanceTypes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ToDoItems",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Date = table.Column<DateTime>(nullable: false),
                    HasTime = table.Column<bool>(nullable: false),
                    Name = table.Column<string>(maxLength: 20, nullable: true),
                    Description = table.Column<string>(maxLength: 50, nullable: true),
                    ImportanceTypeId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ToDoItems", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "ImportanceTypes",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 3, "High" },
                    { 2, "Middle" },
                    { 1, "Low" }
                });

            migrationBuilder.InsertData(
                table: "ToDoItems",
                columns: new[] { "Id", "Date", "Description", "HasTime", "ImportanceTypeId", "Name" },
                values: new object[,]
                {
                    { 1, new DateTime(2020, 4, 5, 18, 0, 0, 0, DateTimeKind.Unspecified), "Go somewhere", true, 3, "Go to walk" },
                    { 2, new DateTime(2020, 4, 6, 13, 0, 0, 0, DateTimeKind.Unspecified), "I should wash him carefully", true, 2, "Wash my cat" },
                    { 3, new DateTime(2020, 4, 6, 11, 0, 0, 0, DateTimeKind.Unspecified), "Bread, milk, ice cream", true, 2, "Go to grocery shop" },
                    { 4, new DateTime(2020, 4, 6, 0, 0, 0, 0, DateTimeKind.Unspecified), "I don't even know", false, 1, "Undefinite action" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ImportanceTypes");

            migrationBuilder.DropTable(
                name: "ToDoItems");
        }
    }
}
