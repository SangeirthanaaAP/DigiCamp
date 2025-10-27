using DigiCamp.Data;
using DigiCamp.DTOs;
using DigiCamp.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class SocialAccountsController : ControllerBase
{
    private readonly DigiCampContext _context;
    public SocialAccountsController(DigiCampContext context) { _context = context; }

    [HttpGet]
    //public IActionResult GetAccounts() => Ok(_context.SocialAccounts.ToList());
    public IActionResult GetAccounts()
    {
        var accounts = _context.SocialAccounts
            .Select(sa => new SocialAccountDto
            {
                Id = sa.Id,
                Platform = sa.Platform,
                CreatedDate = sa.CreatedDate
            }).ToList();

        return Ok(accounts);
    }


    [HttpPost]
    public IActionResult LinkAccount(SocialAccount account)
    {
        //var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        var userIdClaim = User.FindFirst("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier")?.Value;
        if (!int.TryParse(userIdClaim, out var userId)) return Unauthorized();

        // ensure account is linked to authenticated user (ignore client UserId)
        account.UserId = userId;
        var user = _context.Users.Find(userId);
        if (user == null) return NotFound($"User with ID {userId} not found.");

        account.User = user;
        _context.SocialAccounts.Add(account);
        _context.SaveChanges();

        return CreatedAtAction(nameof(GetAccounts), new { id = account.Id }, account);
    }

    [HttpDelete("{id}")]
    public IActionResult UnlinkAccount(int id)
    {
        var account = _context.SocialAccounts.Find(id);
        if (account == null) return NotFound();
        _context.SocialAccounts.Remove(account);
        _context.SaveChanges();
        return Ok("Unlinked");
    }
}
