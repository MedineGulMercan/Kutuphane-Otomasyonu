using Core.Manager;
using Entities.Entity.Concrete;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MySites.Extensions;
using Service.Services.Abstract;

namespace MySites.Controllers
{
    [AllowAnonymous]
    public class KullaniciLoginController : Controller
    {
        private readonly IAccessManager _accessManager;
        private readonly IClaimsManager _claimsManager;
        private readonly IKullaniciService _kullaniciService;
        private readonly IRolDtoService _rolDtoService;

        public KullaniciLoginController(IAccessManager accessManager, IClaimsManager claimsManager, IKullaniciService kullaniciService, IRolDtoService rolDtoService)
        {
            _accessManager = accessManager;
            _claimsManager = claimsManager;
            _kullaniciService = kullaniciService;
            _rolDtoService = rolDtoService;
        }

        public IActionResult Index()
        {
            return View();
        }
        public async Task<IActionResult> LoginKontrol(string Username, string Password)
        {
            // acces managerdaki acces metodundan gelen veri user değişkenine geliyor.
            var user = await _accessManager.Access(Username, Password);
            if (user != null)
            {
                HttpContext.Session.SetObject(user, "aktifKullanıcı"); //session tanımla
                var kullanici = HttpContext.Session.GetObject<Kullanici>("aktifKullanıcı");//aktif kullanıcı keyi ile bu sessionu her sayfada çekebilirim.
                await HttpContext.SignInAsync(await _claimsManager.CreateClaim(kullanici));
                return Redirect("/Home/Index");
            }
            TempData["Error"] = "Hatalı Kullanıcı Adı veya Şifresi";
            return View("Index");
        }
        [HttpPost]
        public async Task UyeOlustur(Kullanici kullanici)
        {
            await _kullaniciService.CreateAsync(kullanici);
            int Id = _rolDtoService.GetAllAsync().Result.OrderByDescending(x=> x.Id).Select(w => w.Id).First();
            RolDto rolDto = new()
            {
                KullaniciId = Id,
                RolId = 2
            };
            await _rolDtoService.CreateAsync(rolDto);
            
        }
    }
}
