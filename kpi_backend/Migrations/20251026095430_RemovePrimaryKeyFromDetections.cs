using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace kpi_backend.Migrations
{
    /// <inheritdoc />
    public partial class RemovePrimaryKeyFromDetections : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
         name: "PK_Detections",
         table: "Detections");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddPrimaryKey(
              name: "PK_Detections",
              table: "Detections",
              column: "Id");
        }
    }
}
