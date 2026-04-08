using Microsoft.AspNetCore.Mvc;

namespace BrewPetalCafe.Backend.Controllers
{
    public class OrdersController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
