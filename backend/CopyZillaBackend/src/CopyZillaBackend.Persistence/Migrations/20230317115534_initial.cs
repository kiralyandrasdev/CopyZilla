using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CopyZillaBackend.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    FirebaseUid = table.Column<string>(type: "text", nullable: false),
                    StripeCustomerId = table.Column<string>(type: "text", nullable: false),
                    Email = table.Column<string>(type: "text", nullable: true),
                    AccountEnabled = table.Column<bool>(type: "boolean", nullable: false, defaultValue: true),
                    AccountDeleted = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false),
                    ProductId = table.Column<string>(type: "text", nullable: true),
                    SubscriptionValidUntil = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    CreatedOn = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ServiceUsageHistory",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    UserId = table.Column<Guid>(type: "uuid", nullable: false),
                    ServiceName = table.Column<string>(type: "text", nullable: false),
                    CreatedOn = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ServiceUsageHistory", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ServiceUsageHistory_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ServiceUsageHistory_UserId",
                table: "ServiceUsageHistory",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ServiceUsageHistory");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
