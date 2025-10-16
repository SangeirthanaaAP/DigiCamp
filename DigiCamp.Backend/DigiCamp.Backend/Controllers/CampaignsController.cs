using DigiCamp.Data;
using DigiCamp.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class CampaignsController : ControllerBase
{
    private readonly DigiCampContext _context;
    public CampaignsController(DigiCampContext context) { _context = context; }

    [HttpGet]
    public IActionResult GetCampaigns() => Ok(_context.Campaigns.ToList());

    [HttpPost]
    public IActionResult CreateCampaign([FromBody] Campaign campaign)
    {
        // Validate required fields
        if (string.IsNullOrWhiteSpace(campaign.Title) || campaign.UserId <= 0)
        {
            return BadRequest("Title and valid UserId are required.");
        }

        // Check if the user exists
        var user = _context.Users.Find(campaign.UserId);
        if (user == null)
        {
            return NotFound($"User with ID {campaign.UserId} not found.");
        }

        // Link the campaign to the user
        campaign.User = user;
        _context.Campaigns.Add(campaign);
        _context.SaveChanges();

        return CreatedAtAction(nameof(GetCampaigns), new { id = campaign.Id }, campaign);
    }

    [HttpPut("{id}")]
    public IActionResult UpdateCampaign(int id, Campaign updated)
    {
        var campaign = _context.Campaigns.Find(id);
        if (campaign == null) return NotFound();
        campaign.Title = updated.Title;
        campaign.Description = updated.Description;
        campaign.StartDate = updated.StartDate;
        campaign.EndDate = updated.EndDate;
        campaign.Status = updated.Status;
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
