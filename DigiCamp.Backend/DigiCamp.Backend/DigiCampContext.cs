using DigiCamp.Models;
using Microsoft.EntityFrameworkCore;

namespace DigiCamp.Data
{
    public class DigiCampContext : DbContext
    {
        public DigiCampContext(DbContextOptions<DigiCampContext> options) : base(options) { }

        public DbSet<User> Users { get; set; } = default!;
        public DbSet<SocialAccount> SocialAccounts { get; set; } = default!;
        public DbSet<Campaign> Campaigns { get; set; } = default!;
        public DbSet<Post> Posts { get; set; } = default!;
        public DbSet<Analytics> Analytics { get; set; } = default!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // USER - SOCIALACCOUNT RELATION
            modelBuilder.Entity<SocialAccount>()
                .HasOne(sa => sa.User)
                .WithMany(u => u.SocialAccounts)
                .HasForeignKey(sa => sa.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            // SOCIALACCOUNT - POST RELATION (SET NO ACTION)
            modelBuilder.Entity<Post>()
                .HasOne(p => p.SocialAccount)
                .WithMany(sa => sa.Posts)
                .HasForeignKey(p => p.SocialAccountId)
                .OnDelete(DeleteBehavior.NoAction); // 🔧 prevents cascade conflict

            // CAMPAIGN - POST RELATION
            modelBuilder.Entity<Post>()
                .HasOne(p => p.Campaign)
                .WithMany(c => c.Posts)
                .HasForeignKey(p => p.CampaignId)
                .OnDelete(DeleteBehavior.Cascade);

            // POST - ANALYTICS RELATION
            modelBuilder.Entity<Analytics>()
                .HasOne(a => a.Post)
                .WithMany(p => p.Analytics) // <-- FIX: Use WithMany instead of WithOne
                .HasForeignKey(a => a.PostId)
                .OnDelete(DeleteBehavior.Cascade);
        }

    }
}
