namespace DigiCamp.DTOs
{
    public class PostDto
    {
        public int Id { get; set; }
        public string? Content { get; set; }
        public DateTime ScheduledAt { get; set; }
        public string? Status { get; set; }
        public int CampaignId { get; set; }
        public int? SocialAccountId { get; set; }
    }
}