using Microsoft.AspNetCore.Mvc;
using BrewPetalCafe.Backend.Models;

namespace BrewPetalCafe.Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContactController : ControllerBase
    {
        private readonly BrewPetalCafeContext _context;

        public ContactController(BrewPetalCafeContext context)
        {
            _context = context;
        }

        [HttpPost]
        public IActionResult SendMessage([FromBody] ContactMessage message)
        {
            message.SentAt = DateTime.Now;
            _context.ContactMessages.Add(message);
            _context.SaveChanges();
            return Ok(new { success = true });
        }
    }
}S
