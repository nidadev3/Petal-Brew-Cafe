using Microsoft.AspNetCore.Mvc;

namespace BrewPetalCafe.Backend.Controllers
{
    public class ContactController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
