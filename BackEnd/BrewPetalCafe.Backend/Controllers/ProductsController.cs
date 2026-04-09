using Microsoft.AspNetCore.Mvc;
using BrewPetalCafe.Backend.Models;
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
    }
}
