using Entities.Entity.Concrete;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Service.Services.Abstract;

namespace MySites.Controllers
{
    //rolu admin olanların bu sayfaya giriş yapabilmesine izin veriyor.
    [Authorize(Roles = "Admin")]
    public class KategoriController : Controller
    {
        private readonly IKategoriService _kategoriService;
        public KategoriController(IKategoriService kategoriService)
        {
            _kategoriService = kategoriService;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public async Task<IActionResult> KategoriGetAll()
        {
            var kategoriler =await _kategoriService.GetAllAsync();
            return Json(kategoriler.Where(x=>x.Aktifmi==true));
        }

        [HttpPost]//Post demek arkadaya veri göndermekdir veri döndürmez
        public async Task<IActionResult> KategoriEkle(Kategori kategori)
        {
            kategori.Aktifmi = true;
            await _kategoriService.CreateAsync(kategori);
            return RedirectToAction("Index", "Kategori");
        }

        [HttpPost]
        public async Task<IActionResult> KategoriGuncelle(Kategori kategori)
        {
            await _kategoriService.UpdateAsync(kategori);
            return RedirectToAction("Index", "Kategori");
        }

        [HttpPost]
        public async Task<IActionResult> KategoriSil(int Id)
        {
            await _kategoriService.KategoriAktiflikSil(Id);
            return RedirectToAction("Index", "Kategori");

        }
    }
}
