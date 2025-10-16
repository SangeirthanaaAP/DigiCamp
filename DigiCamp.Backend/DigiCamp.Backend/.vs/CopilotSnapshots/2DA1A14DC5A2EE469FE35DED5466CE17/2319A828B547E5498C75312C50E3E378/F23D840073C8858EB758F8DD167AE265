using System;
using System.Collections.Generic;

namespace DigiCamp.Models
{
    public class Post
    {
        public int Id { get; set; }

        // Content and scheduling
        public string? Content { get; set; }
        public DateTime ScheduledAt { get; set; } = DateTime.UtcNow;
        public string? Status { get; set; } = "Scheduled"; // Pending, Posted, Failed

        // Relationship to Campaign
        public int CampaignId { get; set; }
        public Campaign? Campaign { get; set; }

        // Relationship to SocialAccount (destination channel)
        public int? SocialAccountId { get; set; }
        public SocialAccount? SocialAccount { get; set; }

        // Navigation to Analytics
        public ICollection<Analytics> Analytics { get; set; } = new List<Analytics>();
    }
}