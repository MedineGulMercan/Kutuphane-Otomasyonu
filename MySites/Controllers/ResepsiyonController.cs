using Entities.Entity.Concrete;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MySites.Extensions;
using Service.Services.Abstract;
using Service.Services.Concrete;
using System.Data;

namespace MySites.Controllers
{
    [Authorize(Roles = "Admin")]
    public class ResepsiyonController : Controller
    {
        private readonly IKitapService _kitapService;
        private readonly IKullaniciService _kullaniciService;
        private readonly IResepsiyonService _resepsiyonService;

        public ResepsiyonController(IKitapService kitapService, IKullaniciService kullaniciService, IResepsiyonService resepsiyonService)
        {
            _kitapService = kitapService;
            _kullaniciService = kullaniciService;
            _resepsiyonService = resepsiyonService;
        }

        public IActionResult Index()
        {
            return View();
        }
        [HttpGet]
        public async Task<IActionResult> ResepsiyonGetAll()
        {
            var resepsiyon = await _resepsiyonService.ResepsiyonGetAllAsync();
            return Json(resepsiyon);
        }
        [HttpGet]
        public async Task<IActionResult> KitapGetAll()
        {
            var kitaplar = await _kitapService.GetAllAsync();
            return Json(kitaplar.Where(x=>x.KitapStok>0));
        }
        [HttpGet]
        public async Task<IActionResult> KullaniciGetAll()
        {
            var kullanicilar = await _kullaniciService.GetAllAsync();
            return Json(kullanicilar);
        }
        [HttpGet]
        public async Task<IActionResult> KitapGetir(int kitapId)
        {
            var kitap = await _kitapService.GetAsync(kitapId);
            return Json(kitap);
        }
        [HttpGet]
        public async Task<IActionResult> KullaniciGetir(int kullaniciId)
        {
            var kullanici = await _kullaniciService.GetAsync(kullaniciId);
            return Json(kullanici);
        }
        [HttpPost]//Post demek arkadaya veri göndermekdir veri döndürmez
        public async Task<IActionResult> ResepsiyonEkle(Resepsiyon resepsiyon)
        {
            var user = HttpContext.Session.GetObject<Kullanici>("aktifKullanıcı");
            resepsiyon.TeslimEdildi = true;
            resepsiyon.SorumluId= user.Id;
            await _resepsiyonService.CreateAsync(resepsiyon);
            return RedirectToAction("Index", "Kategori");
        }
        [HttpPost]//Post demek arkadaya veri göndermekdir veri döndürmez
        public async Task ResepsiyonSil(int Id)
        {
            await _resepsiyonService.DeleteAsync(Id);
        }
    }
}
