using DigiCamp.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DigiCamp.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class AnalyticsController : ControllerBase
    {
        private readonly DigiCampContext _context;

        public AnalyticsController(DigiCampContext context)
        {
            _context = context;
        }

        // GET api/analytics/post/{postId}
        [HttpGet("post/{postId}")]
        public async Task<IActionResult> GetPostAnalytics(int postId)
        {
            var analytics = await _context.Analytics
                .Where(a => a.PostId == postId)
                .ToListAsync();

            if (!analytics.Any()) return NotFound();
            return Ok(analytics);
        }

        // GET api/analytics/campaign/{campaignId}
        [HttpGet("campaign/{campaignId}")]
        public async Task<IActionResult> GetCampaignAnalytics(int campaignId)
        {
            // ensure campaign exists
            var campaign = await _context.Campaigns.FindAsync(campaignId);
            if (campaign == null) return NotFound();

            var postIds = await _context.Posts.Where(p => p.CampaignId == campaignId).Select(p => p.Id).ToListAsync();
            var analytics = await _context.Analytics.Where(a => postIds.Contains(a.PostId)).ToListAsync();

            return Ok(analytics);
        }

        // GET api/analytics/user/{userId}
        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetUserAnalytics(int userId)
        {
            var campaignIds = await _context.Campaigns.Where(c => c.UserId == userId).Select(c => c.Id).ToListAsync();
            var analytics = await _context.Analytics.Where(a => campaignIds.Contains(a.Post!.CampaignId)).ToListAsync();
            return Ok(analytics);
        }
    }
}
