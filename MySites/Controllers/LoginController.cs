using Core.Manager;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication;
using MySites.Extensions;
using Entities.Entity.Concrete;
using Microsoft.AspNetCore.Authorization;

namespace MySites.Controllers
{
    //kullanıcı giriş yapmadan da bu sayfaya girebilir demek.
    [AllowAnonymous]
    public class LoginController : Controller
    {
        private readonly IAccessManager _accessManager;
        private readonly IClaimsManager _claimsManager;

        public LoginController(IAccessManager accessManager, IClaimsManager claimsManager)
        {
            _accessManager = accessManager;
            _claimsManager = claimsManager;
        }
        [AllowAnonymous]
        public IActionResult Index()
        {
            return View();
        }
        [HttpPost("login")]
        public async Task<IActionResult> LoginKontrol(string Username, string Password)
        {
            // acces managerdaki acces metodundan gelen veri user değişkenine geliyor.
            var user = await _accessManager.Access(Username, Password);
            if (user != null)
            {
                HttpContext.Session.SetObject(user, "aktifKullanıcı"); //session tanımla
                var kullanici = HttpContext.Session.GetObject<Kullanici>("aktifKullanıcı");//aktif kullanıcı keyi ile bu sessionu her sayfada çekebilirim.
                await HttpContext.SignInAsync(await _claimsManager.CreateClaim(kullanici));
                return Redirect("/AdminHome/Index");
            }
            TempData["Error"] = "Hatalı Kullanıcı Adı veya Şifresi";
            return View("Index");
        }
        public async Task<IActionResult> Logout()
        {
            await HttpContext.SignOutAsync();
            HttpContext.Session.Clear();
            return Redirect("/KullaniciLogin/Index");
        }
    }
}
