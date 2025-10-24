using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace kpi_backend.Migrations
{
    /// <inheritdoc />
    public partial class InitialKpiPreset : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ChartType",
                table: "KPIPresets");

            migrationBuilder.DropColumn(
                name: "Filters",
                table: "KPIPresets");

            migrationBuilder.DropColumn(
                name: "GroupBy",
                table: "KPIPresets");

            migrationBuilder.RenameColumn(
                name: "Metric",
                table: "KPIPresets",
                newName: "JsonPayload");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "KPIPresets",
                type: "nvarchar(200)",
                maxLength: 200,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "KPIPresets",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AlterColumn<int>(
                name: "Vest",
                table: "Detections",
                type: "int",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "bit");

            migrationBuilder.CreateTable(
                name: "KPIResults",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    TimeBucket = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Class = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Zone = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Value = table.Column<double>(type: "float", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_KPIResults", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "KPIResults");

            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "KPIPresets");

            migrationBuilder.RenameColumn(
                name: "JsonPayload",
                table: "KPIPresets",
                newName: "Metric");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "KPIPresets",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(200)",
                oldMaxLength: 200);

            migrationBuilder.AddColumn<string>(
                name: "ChartType",
                table: "KPIPresets",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Filters",
                table: "KPIPresets",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "GroupBy",
                table: "KPIPresets",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AlterColumn<bool>(
                name: "Vest",
                table: "Detections",
                type: "bit",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");
        }
    }
}
