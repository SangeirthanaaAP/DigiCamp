using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DigiCamp.Backend.Migrations
{
    /// <inheritdoc />
    public partial class UpdateRelationsFix : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Analytics_Campaigns_CampaignId",
                table: "Analytics");

            migrationBuilder.DropColumn(
                name: "Platform",
                table: "Posts");

            migrationBuilder.RenameColumn(
                name: "ScheduledTime",
                table: "Posts",
                newName: "ScheduledAt");

            migrationBuilder.AddColumn<int>(
                name: "SocialAccountId",
                table: "Posts",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<int>(
                name: "CampaignId",
                table: "Analytics",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<int>(
                name: "PostId",
                table: "Analytics",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Posts_SocialAccountId",
                table: "Posts",
                column: "SocialAccountId");

            migrationBuilder.CreateIndex(
                name: "IX_Analytics_PostId",
                table: "Analytics",
                column: "PostId");

            migrationBuilder.AddForeignKey(
                name: "FK_Analytics_Campaigns_CampaignId",
                table: "Analytics",
                column: "CampaignId",
                principalTable: "Campaigns",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Analytics_Posts_PostId",
                table: "Analytics",
                column: "PostId",
                principalTable: "Posts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Posts_SocialAccounts_SocialAccountId",
                table: "Posts",
                column: "SocialAccountId",
                principalTable: "SocialAccounts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Analytics_Campaigns_CampaignId",
                table: "Analytics");

            migrationBuilder.DropForeignKey(
                name: "FK_Analytics_Posts_PostId",
                table: "Analytics");

            migrationBuilder.DropForeignKey(
                name: "FK_Posts_SocialAccounts_SocialAccountId",
                table: "Posts");

            migrationBuilder.DropIndex(
                name: "IX_Posts_SocialAccountId",
                table: "Posts");

            migrationBuilder.DropIndex(
                name: "IX_Analytics_PostId",
                table: "Analytics");

            migrationBuilder.DropColumn(
                name: "SocialAccountId",
                table: "Posts");

            migrationBuilder.DropColumn(
                name: "PostId",
                table: "Analytics");

            migrationBuilder.RenameColumn(
                name: "ScheduledAt",
                table: "Posts",
                newName: "ScheduledTime");

            migrationBuilder.AddColumn<string>(
                name: "Platform",
                table: "Posts",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "CampaignId",
                table: "Analytics",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Analytics_Campaigns_CampaignId",
                table: "Analytics",
                column: "CampaignId",
                principalTable: "Campaigns",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
