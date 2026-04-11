using BrewPetalCafe.Backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace BrewPetalCafe.Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrdersController : Controller
    {
        private readonly BrewPetalCafeContext _context;

        public OrdersController(BrewPetalCafeContext context)
        {
            _context = context;
        }
        [HttpPost]
        public IActionResult PlaceOrder([FromBody] Order order)
        {
            order.OrderDate = DateTime.Now;
            order.Status = "Pending";
            _context.Orders.Add(order);
            _context.SaveChanges();
            return Ok(new { success = true, orderId = order.Id });
        }

    }
}
