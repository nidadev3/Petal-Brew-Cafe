using BrewPetalCafe.Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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
        [HttpGet]
        public IActionResult GetAll()
        {
            var orders = _context.Orders
                .Include(o => o.OrderItems)
                .ToList();
            return Ok(orders);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateStatus(int id, [FromBody] Order updatedOrder)
        {
            var order = _context.Orders.Find(id);
            if (order == null)
            {
                return NotFound();
            }
            order.Status = updatedOrder.Status;
            _context.SaveChanges();
            return Ok(new { success = true });
        }
    }
}
