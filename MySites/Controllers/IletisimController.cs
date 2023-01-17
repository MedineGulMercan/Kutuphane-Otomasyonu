using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MySites.Controllers
{
    [Authorize(Roles = "Kullanici,Admin")]
    public class IletisimController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
