using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Infrastructure.Migrations
{
    public partial class Init : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ImportanceTypes",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false),
                    Name = table.Column<string>(maxLength: 200, nullable: true)
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
                    Name = table.Column<string>(maxLength: 15, nullable: false),
                    Description = table.Column<string>(maxLength: 30, nullable: true),
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
                    { 1, new DateTime(2019, 5, 1, 13, 0, 0, 0, DateTimeKind.Unspecified), "ddddd", true, 3, "test1" },
                    { 2, new DateTime(2019, 5, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "aaaaa", false, 3, "test2" }
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
