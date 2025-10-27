namespace DigiCamp.DTOs
{
    public class AnalyticsDto
    {
        public int Id { get; set; }
        public int PostId { get; set; }
        public int Impressions { get; set; }
        public int Clicks { get; set; }
        public double EngagementRate { get; set; }
        public DateTime Date { get; set; }
    }
}