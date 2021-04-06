﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Web.Migrations;

namespace Infrastructure.Migrations
{
    [DbContext(typeof(AppDbContext))]
    [Migration("20200407192322_Init")]
    partial class Init
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Domain.Entities.ImportanceType", b =>
                {
                    b.Property<int>("Id")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(20)")
                        .HasMaxLength(20);

                    b.HasKey("Id");

                    b.ToTable("ImportanceTypes");

                    b.HasData(
                        new
                        {
                            Id = 3,
                            Name = "High"
                        },
                        new
                        {
                            Id = 2,
                            Name = "Middle"
                        },
                        new
                        {
                            Id = 1,
                            Name = "Low"
                        });
                });

            modelBuilder.Entity("Domain.ToDoItem", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("Date")
                        .HasColumnType("datetime2");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(100)")
                        .HasMaxLength(100);

                    b.Property<bool>("HasTime")
                        .HasColumnType("bit");

                    b.Property<int>("ImportanceTypeId")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(40)")
                        .HasMaxLength(40);

                    b.HasKey("Id");

                    b.ToTable("ToDoItems");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Date = new DateTime(2020, 4, 5, 18, 0, 0, 0, DateTimeKind.Unspecified),
                            Description = "Go somewhere",
                            HasTime = true,
                            ImportanceTypeId = 3,
                            Name = "Go to walk"
                        },
                        new
                        {
                            Id = 2,
                            Date = new DateTime(2020, 4, 6, 13, 0, 0, 0, DateTimeKind.Unspecified),
                            Description = "I should wash him carefully",
                            HasTime = true,
                            ImportanceTypeId = 2,
                            Name = "Wash my cat"
                        },
                        new
                        {
                            Id = 3,
                            Date = new DateTime(2020, 4, 6, 11, 0, 0, 0, DateTimeKind.Unspecified),
                            Description = "Bread, milk, ice cream",
                            HasTime = true,
                            ImportanceTypeId = 2,
                            Name = "Go to grocery shop"
                        },
                        new
                        {
                            Id = 4,
                            Date = new DateTime(2020, 4, 6, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Description = "I don't even know",
                            HasTime = false,
                            ImportanceTypeId = 1,
                            Name = "Undefinite action"
                        });
                });
#pragma warning restore 612, 618
        }
    }
}
