using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CopyZillaBackend.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class userplantypeadd : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "PlanType",
                table: "Users",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PlanType",
                table: "Users");
        }
    }
}
