using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DigiCamp.Backend.Migrations
{
    /// <inheritdoc />
    public partial class FixCascadeBehavior_RestrictSocialAccount : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SocialAccounts_Users_UserId",
                table: "SocialAccounts");

            migrationBuilder.AddForeignKey(
                name: "FK_SocialAccounts_Users_UserId",
                table: "SocialAccounts",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SocialAccounts_Users_UserId",
                table: "SocialAccounts");

            migrationBuilder.AddForeignKey(
                name: "FK_SocialAccounts_Users_UserId",
                table: "SocialAccounts",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
