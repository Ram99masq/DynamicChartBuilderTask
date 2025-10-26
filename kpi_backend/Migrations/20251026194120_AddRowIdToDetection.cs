using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace kpi_backend.Migrations
{
    /// <inheritdoc />
    public partial class AddRowIdToDetection : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Step 1: Add RowId column (nullable initially to avoid constraint failure)
            migrationBuilder.AddColumn<Guid>(
                name: "RowId",
                table: "Detections",
                type: "uniqueidentifier",
                nullable: true);

            // Step 2: Populate RowId for existing rows
            migrationBuilder.Sql("UPDATE Detections SET RowId = NEWID() WHERE RowId IS NULL");

            // Step 3: Make RowId non-nullable and set as primary key
            migrationBuilder.AlterColumn<Guid>(
                name: "RowId",
                table: "Detections",
                type: "uniqueidentifier",
                nullable: false,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Detections",
                table: "Detections",
                column: "RowId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
