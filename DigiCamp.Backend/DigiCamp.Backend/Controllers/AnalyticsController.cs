using DigiCamp.Data;
using DigiCamp.DTOs;
using DigiCamp.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class AnalyticsController : ControllerBase
{
    private readonly DigiCampContext _context;
    public AnalyticsController(DigiCampContext context) => _context = context;

    [HttpGet("post/{postId}")]
    public IActionResult GetByPost(int postId)
    {
        var analytics = _context.Analytics
            .Where(a => a.PostId == postId)
            .Select(a => new AnalyticsDto
            {
                Id = a.Id,
                PostId = a.PostId,
                Impressions = a.Impressions,
                Clicks = a.Clicks,
                EngagementRate = a.EngagementRate,
                Date = a.Date
            }).ToList();

        return Ok(analytics);
    }

    [HttpGet("campaign/{campaignId}")]
    public IActionResult GetByCampaign(int campaignId)
    {
        var analytics = _context.Analytics
            .Include(a => a.Post)
            .ThenInclude(p => p.Campaign)
            .Where(a => a.Post != null && a.Post.Campaign != null && a.Post.Campaign.Id == campaignId)
            .Select(a => new AnalyticsDto
            {
                Id = a.Id,
                PostId = a.PostId,
                Impressions = a.Impressions,
                Clicks = a.Clicks,
                EngagementRate = a.EngagementRate,
                Date = a.Date
            }).ToList();

        return Ok(analytics);
    }

    [HttpGet("user/{userId}")]
    public IActionResult GetByUser(int userId)
    {
        var analytics = _context.Analytics
            .Include(a => a.Post)
            .ThenInclude(p => p.Campaign)
            .Where(a => a.Post != null && a.Post.Campaign != null && a.Post.Campaign.UserId == userId)
            .Select(a => new AnalyticsDto
            {
                Id = a.Id,
                PostId = a.PostId,
                Impressions = a.Impressions,
                Clicks = a.Clicks,
                EngagementRate = a.EngagementRate,
                Date = a.Date
            }).ToList();

        return Ok(analytics);
    }

    [HttpGet("summary/{userId}")]
    public IActionResult GetDashboardSummary(int userId)
    {
        var campaigns = _context.Campaigns
            .Include(c => c.Posts)
            .ThenInclude(p => p.Analytics)
            .Where(c => c.UserId == userId)
            .ToList();

        var totalPosts = campaigns.SelectMany(c => c.Posts).Count();
        var totalReach = campaigns.SelectMany(c => c.Posts)
            .Select(p => p.Analytics)
            .Where(a => a != null)
            .Sum(a => a?.Impressions ?? 0);

        var avgEngagement = campaigns.SelectMany(c => c.Posts)
            .Select(p => p.Analytics)
            .Where(a => a != null)
            .Average(a => a?.EngagementRate ?? 0);

        var campaignCount = campaigns.Count;

        return Ok(new
        {
            totalPosts,
            totalReach,
            avgEngagement = Math.Round(avgEngagement, 2),
            campaignCount
        });
    }

    [HttpPost]
    public IActionResult AddAnalytics([FromBody] AnalyticsDto dto)
    {
        var post = _context.Posts.Find(dto.PostId);
        if (post == null) return NotFound($"Post with ID {dto.PostId} not found.");

        var analytics = new Analytics
        {
            PostId = dto.PostId,
            Impressions = dto.Impressions,
            Clicks = dto.Clicks,
            EngagementRate = dto.EngagementRate,
            Date = dto.Date
        };

        _context.Analytics.Add(analytics);
        _context.SaveChanges();

        return CreatedAtAction(nameof(GetByPost), new { postId = dto.PostId }, analytics);
    }
}