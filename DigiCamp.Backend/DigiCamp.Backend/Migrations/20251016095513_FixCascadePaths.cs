using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DigiCamp.Backend.Migrations
{
    /// <inheritdoc />
    public partial class FixCascadePaths : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Posts_SocialAccounts_SocialAccountId",
                table: "Posts");

            migrationBuilder.DropForeignKey(
                name: "FK_SocialAccounts_Users_UserId",
                table: "SocialAccounts");

            migrationBuilder.AddForeignKey(
                name: "FK_Posts_SocialAccounts_SocialAccountId",
                table: "Posts",
                column: "SocialAccountId",
                principalTable: "SocialAccounts",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_SocialAccounts_Users_UserId",
                table: "SocialAccounts",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Posts_SocialAccounts_SocialAccountId",
                table: "Posts");

            migrationBuilder.DropForeignKey(
                name: "FK_SocialAccounts_Users_UserId",
                table: "SocialAccounts");

            migrationBuilder.AddForeignKey(
                name: "FK_Posts_SocialAccounts_SocialAccountId",
                table: "Posts",
                column: "SocialAccountId",
                principalTable: "SocialAccounts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_SocialAccounts_Users_UserId",
                table: "SocialAccounts",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
