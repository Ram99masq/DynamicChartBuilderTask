using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace kpi_backend.Migrations
{
    /// <inheritdoc />
    public partial class SetRowIdDefault : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<Guid>(
            name: "RowId",
            table: "Detections",
            type: "uniqueidentifier",
            nullable: false,
            defaultValueSql: "NEWID()",
            oldClrType: typeof(Guid),
            oldType: "uniqueidentifier");


        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
