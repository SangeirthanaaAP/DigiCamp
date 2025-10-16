using DigiCamp.Data;
using DigiCamp.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace DigiCamp.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class PostsController : ControllerBase
    {
        private readonly DigiCampContext _context;

        public PostsController(DigiCampContext context)
        {
            _context = context;
        }

        // GET: api/posts
        [HttpGet]
        public async Task<IActionResult> GetUserPosts()
        {
            var userId = GetUserIdFromClaims();
            var posts = await _context.Posts
                .Include(p => p.Campaign)
                .Include(p => p.SocialAccount)
                .Where(p => p.Campaign != null && p.Campaign.UserId == userId)
                .ToListAsync();

            return Ok(posts);
        }

        // GET: api/posts/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetPost(int id)
        {
            var post = await _context.Posts
                .Include(p => p.Campaign)
                .Include(p => p.SocialAccount)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (post == null) return NotFound();
            if (post.Campaign == null || post.Campaign.UserId != GetUserIdFromClaims()) return Forbid();

            return Ok(post);
        }

        // POST: api/posts
        [HttpPost]
        public async Task<IActionResult> CreatePost([FromBody] Post dto)
        {
            // basic validation
            var campaign = await _context.Campaigns.FindAsync(dto.CampaignId);
            if (campaign == null) return BadRequest("Campaign not found.");
            if (campaign.UserId != GetUserIdFromClaims()) return Forbid();

            var social = await _context.SocialAccounts.FindAsync(dto.SocialAccountId);
            if (social == null) return BadRequest("Social account not found.");
            if (social.UserId != GetUserIdFromClaims()) return Forbid();

            var post = new Post
            {
                CampaignId = dto.CampaignId,
                SocialAccountId = dto.SocialAccountId,
                Content = dto.Content,
                ScheduledAt = dto.ScheduledAt,
                Status = dto.Status ?? "Scheduled"
            };

            _context.Posts.Add(post);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetPost), new { id = post.Id }, post);
        }

        // PUT: api/posts/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePost(int id, [FromBody] Post updated)
        {
            var post = await _context.Posts.Include(p => p.Campaign).FirstOrDefaultAsync(p => p.Id == id);
            if (post == null) return NotFound();
            if (post.Campaign == null || post.Campaign.UserId != GetUserIdFromClaims()) return Forbid();

            // allow update of content, scheduled time, status and socialAccount
            post.Content = updated.Content ?? post.Content;
            post.ScheduledAt = updated.ScheduledAt;
            post.Status = updated.Status ?? post.Status;

            // change social account if requested
            if (updated.SocialAccountId != 0 && updated.SocialAccountId != post.SocialAccountId)
            {
                var social = await _context.SocialAccounts.FindAsync(updated.SocialAccountId);
                if (social == null) return BadRequest("Social account not found.");
                if (social.UserId != GetUserIdFromClaims()) return Forbid();
                post.SocialAccountId = updated.SocialAccountId;
            }

            await _context.SaveChangesAsync();
            return Ok(post);
        }

        // DELETE: api/posts/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePost(int id)
        {
            var post = await _context.Posts.Include(p => p.Campaign).FirstOrDefaultAsync(p => p.Id == id);
            if (post == null) return NotFound();
            if (post.Campaign == null || post.Campaign.UserId != GetUserIdFromClaims()) return Forbid();

            _context.Posts.Remove(post);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Deleted" });
        }

        private int GetUserIdFromClaims()
        {
            var claim = User.FindFirst(ClaimTypes.NameIdentifier) ?? User.FindFirst("id");
            return int.TryParse(claim?.Value, out var id) ? id : 0;
        }
    }
}
