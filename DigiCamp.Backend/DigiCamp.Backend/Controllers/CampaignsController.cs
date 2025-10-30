using DigiCamp.Data;
using DigiCamp.DTOs;
using DigiCamp.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class CampaignsController : ControllerBase
{
    private readonly DigiCampContext _context;
    public CampaignsController(DigiCampContext context) => _context = context;

    [HttpGet]
    public IActionResult GetCampaigns()
    {
        var campaigns = _context.Campaigns
            .Select(c => new CampaignDto
            {
                Id = c.Id,
                Title = c.Title,
                Description = c.Description,
                StartDate = c.StartDate,
                EndDate = c.EndDate,
                Status = c.Status,
                UserId = c.UserId
            }).ToList();

        return Ok(campaigns);
    }

    [HttpGet("{id}")]
    public IActionResult GetCampaignDetails(int id)
    {
        var campaign = _context.Campaigns
            .Include(c => c.Posts)
            .ThenInclude(p => p.Analytics)
            .FirstOrDefault(c => c.Id == id);

        if (campaign == null) return NotFound();

        var result = new
        {
            campaign.Id,
            campaign.Title,
            campaign.Description,
            campaign.StartDate,
            campaign.EndDate,
            campaign.Status,
            campaign.UserId,
            Posts = campaign.Posts.Select(p => new {
                p.Id,
                p.Content,
                p.ScheduledAt,
                p.Status,
                Analytics = p.Analytics == null ? null : new
                {
                    p.Analytics.Impressions,
                    p.Analytics.Clicks,
                    p.Analytics.EngagementRate,
                    p.Analytics.Date
                }
            })
        };

        return Ok(result);
    }



    [HttpPost]
    public IActionResult CreateCampaign([FromBody] CampaignDto dto)
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (!int.TryParse(userIdClaim, out var userId)) return Unauthorized();

        var campaign = new Campaign
        {
            Title = dto.Title,
            Description = dto.Description,
            StartDate = dto.StartDate,
            EndDate = dto.EndDate,
            Status = dto.Status ?? "Draft",
            UserId = userId
        };

        _context.Campaigns.Add(campaign);
        _context.SaveChanges();

        return CreatedAtAction(nameof(GetCampaigns), new { id = campaign.Id }, campaign);
    }

    [HttpPut("{id}")]
    public IActionResult UpdateCampaign(int id, [FromBody] CampaignDto dto)
    {
        var campaign = _context.Campaigns.Find(id);
        if (campaign == null) return NotFound();

        campaign.Title = dto.Title;
        campaign.Description = dto.Description;
        campaign.StartDate = dto.StartDate;
        campaign.EndDate = dto.EndDate;
        campaign.Status = dto.Status;

        _context.SaveChanges();
        return Ok(campaign);
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteCampaign(int id)
    {
        var campaign = _context.Campaigns.Find(id);
        if (campaign == null) return NotFound();

        _context.Campaigns.Remove(campaign);
        _context.SaveChanges();
        return Ok("Deleted");
    }
}