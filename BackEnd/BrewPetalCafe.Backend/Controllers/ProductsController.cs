using Microsoft.AspNetCore.Mvc;
using BrewPetalCafe.Backend.Models;
using Microsoft.EntityFrameworkCore;
namespace BrewPetalCafe.Backend.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class ContactController : Controller
    {
        private readonly BrewPetalCafeContext _context;
        public ContactController(BrewPetalCafeContext context)
        {
            _context = context;
        }

        //Getting All products in the database
        [HttpGet]
        public IActionResult GetAll()
        {
            var products = _context.Products.ToList();
            return Ok(products);
        }

        //Getting a product by category
        [HttpGet("by-category/{categoryName}")]
        public IActionResult GetByCategory(string categoryName)
        {
            var products=_context.Products.Include(p=> p.Category)
                .Where(p=>p.Category.Name == categoryName).ToList();
            return Ok(products);
        }
    }
}