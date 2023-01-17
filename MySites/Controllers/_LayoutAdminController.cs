using Entities.Entity.Concrete;
using Microsoft.AspNetCore.Mvc;
using MySites.Extensions;

namespace MySites.Controllers
{
    public class _LayoutAdminController : Controller
    {
        public IActionResult _LayoutAdmin()
        {
            var kullanici = HttpContext.Session.GetObject<Kullanici>("aktifKullanıcı");
            ViewBag.Kullanici = kullanici.Isim + " " + kullanici.Soyisim;
            return View();
        }
    }
}
