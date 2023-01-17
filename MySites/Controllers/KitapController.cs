using Entities.Entity.Concrete;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Service.Services.Abstract;
using Service.Services.Concrete;

namespace MySites.Controllers
{
    //rolu admin olanların bu sayfaya giriş yapabilmesine izin veriyor.
    [Authorize(Roles = "Admin")]
    public class KitapController : Controller
    {
        private readonly IKategoriService _kategoriService;
        private readonly IKitapService _kitapService;
        private readonly IKitapRafAraService _kitapRafAraService;
        private readonly IRafService _rafService;
        IWebHostEnvironment _env;
        string? _directory;

        public KitapController(IKategoriService kategoriService, IKitapService kitapService, IWebHostEnvironment env, IKitapRafAraService kitapRafAraService, IRafService rafService)
        {
            _kategoriService = kategoriService;
            _kitapService = kitapService;
            _env = env;
            _directory = _env.ContentRootPath + "wwwroot";
            _kitapRafAraService = kitapRafAraService;
            _rafService = rafService;
        }

        public IActionResult Index()
        {
            return View();
        }
        [HttpGet]
        public async Task<IActionResult> KategoriGetAll()
        {
            var kategoriler = await _kategoriService.GetAllAsync();
            return Json(kategoriler);
        }

        [HttpGet]
        public async Task<IActionResult> KitapGetAll()
        {
            var kitaplar = await _kitapService.GetAllAsync();
            return Json(kitaplar);
        }

        [HttpPost]//Post demek arkadaya veri göndermekdir veri döndürmez
        public async Task<IActionResult> KitapEkle(Kitap kitap, IFormFile file, int RafId)
        {
            await _kitapService.CreateAsync(kitap);
            var Id = _kitapService.GetAllAsync().Result.Last().Id;
            if (file != null)
            {
                string fileName = $"{Id}-{DateTime.Now.ToString("yyyy-MM-dd")} {DateTime.Now.ToString("HH-mm-ss")}{Path.GetExtension(file.FileName)}";

                using (FileStream stream = new(Path.Combine(_directory + "/Files/" + fileName), FileMode.Create, FileAccess.Write))
                {
                    file.CopyTo(stream);
                    kitap.KitapResimYolu = "/Files/" + fileName;
                    kitap.Id = Id;
                    await _kitapService.UpdateAsync(kitap);
                }
            }
            if (RafId != 0)
            {
                KitapRafAra kitapRafAra = new() { KitapId = Id, RafId = RafId};
                await _kitapRafAraService.CreateAsync(kitapRafAra);
            }
            return RedirectToAction("Index", "Kitap");
        }
        [HttpPost]//Post demek arkadaya veri göndermekdir veri döndürmez
        public async Task<IActionResult> KitapGuncelle(Kitap kitap, IFormFile file, int RafId, bool DosyaSilinicek)
        {
            var dosyaYolu = _kitapService.GetAsync(kitap.Id).Result.KitapResimYolu;
            if (DosyaSilinicek == true)
            {
                if (dosyaYolu != null)
                {
                    string? dosya = _directory + dosyaYolu;
                    System.IO.File.Delete(dosya);
                }
            }
            else
            {
                kitap.KitapResimYolu = dosyaYolu;
            }

            if (file != null)
            {
                string fileName = $"{kitap.Id}-{DateTime.Now.ToString("yyyy-MM-dd")} {DateTime.Now.ToString("HH-mm-ss")}{Path.GetExtension(file.FileName)}";
                using (FileStream stream = new(Path.Combine(_directory + "/Files/" + fileName), FileMode.Create, FileAccess.Write))
                {
                    file.CopyTo(stream);
                    kitap.KitapResimYolu = "/Files/" + fileName;
                }
            }
            

            if (RafId != 0)
            {
                KitapRafAra kitapRafAra = new() { KitapId = kitap.Id, RafId = RafId };
                await _kitapRafAraService.UpdateAsync(kitapRafAra);
            }
            await _kitapService.UpdateAsync(kitap);
            return RedirectToAction("Index", "Kitap");
        }
        [HttpPost]//Post demek arkadaya veri göndermekdir veri döndürmez
        public async Task<IActionResult> KitapSil(int Id)
        {
            await _kitapService.DeleteAsync(Id);
            return RedirectToAction("Index", "Kitap");
        }
        [HttpGet]
        public async Task<IActionResult> RaflarGetAll(int KitapId)
        {
            var raflar = await _rafService.RafGetAllAsync();
            var raf = _kitapRafAraService.GetAllAsync().Result.Where(x => x.KitapId == KitapId);
            if (raf.Count() != 0)
            { 
                var result = raflar.Where(x => x.AktifMi == true && x.Id == raf.FirstOrDefault(x=>x.KitapId == KitapId).RafId);
                return Json(result);
            }
            return Json(null);
        }
    }
}
