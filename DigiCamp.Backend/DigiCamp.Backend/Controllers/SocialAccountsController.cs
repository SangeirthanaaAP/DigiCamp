using DigiCamp.Data;
using DigiCamp.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class SocialAccountsController : ControllerBase
{
    private readonly DigiCampContext _context;
    public SocialAccountsController(DigiCampContext context) { _context = context; }

    [HttpGet]
    public IActionResult GetAccounts() => Ok(_context.SocialAccounts.ToList());

    [HttpPost]
    public IActionResult LinkAccount(SocialAccount account)
    {
        // Validate required fields
        if (string.IsNullOrWhiteSpace(account.Platform) ||
            string.IsNullOrWhiteSpace(account.AccessToken) ||
            account.UserId <= 0)
        {
            return BadRequest("Platform, AccessToken, and valid UserId are required.");
        }

        // Check if the user exists
        var user = _context.Users.Find(account.UserId);
        if (user == null)
        {
            return NotFound($"User with ID {account.UserId} not found.");
        }

        // Link the account to the user
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
