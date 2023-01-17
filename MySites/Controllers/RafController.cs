using Entities.Entity.Concrete;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Service.Services.Abstract;
using Service.Services.Concrete;
using System.Data;

namespace MySites.Controllers
{
    [Authorize(Roles = "Admin")]
    public class RafController : Controller
    {
        public readonly IRafService _rafService;
        public readonly IKatService _katService;
        public readonly IOdaService _odaService;
        public readonly IKitaplikService _kitaplikService;
        public RafController(IRafService rafService, IKatService katService, IOdaService odaService, IKitaplikService kitaplikService)
        {
            _rafService = rafService;
            _katService = katService;
            _odaService = odaService;
            _kitaplikService = kitaplikService;
        }
        public IActionResult Index()
        {
            return View();
        }
        [HttpGet]
        public async Task<IActionResult> RafGetAll()
        {
            var raflar = await _rafService.RafGetAllAsync();
            return Json(raflar.Where(x => x.AktifMi == true));
        }
        [HttpGet]
        public async Task<IActionResult> RaflarGetAll(int KitaplikId)
        {
            var raflar = await _rafService.RafGetAllAsync();
            return Json(raflar.Where(x => x.AktifMi == true && x.KitaplikId == KitaplikId));
        }
        [HttpGet]
        public async Task<IActionResult> KatGetAll()
        {
            var katlar = await _katService.GetAllAsync();
            return Json(katlar.Where(x => x.AktifMi == true));
        }
        [HttpGet]
        public async Task<IActionResult> OdaGetAll(int KatId)
        {
            var odalar = await _odaService.GetAllAsync();
            return Json(odalar.Where(x => x.AktifMi == true && x.KatId == KatId));
        }
        [HttpGet]
        public async Task<IActionResult> KitaplikGetAll(int OdaId)
        {
            var kitapliklar = await _kitaplikService.GetAllAsync();
            return Json(kitapliklar.Where(x => x.AktifMi == true && x.OdaId == OdaId));
        }
        [HttpPost]
        public async Task<IActionResult> RafEkle(Raf raf)
        {
            raf.AktifMi = true;
            await _rafService.CreateAsync(raf);
            return RedirectToAction("Index","Raf");
        }

        [HttpPost]
        public async Task<IActionResult> RafGuncelle(Raf raf)
        {
            await _rafService.UpdateAsync(raf);
            return RedirectToAction("Index", "Raf");
        }

        [HttpPost]
        public async Task<IActionResult> RafAktiflikSil(int Id)
        {
            await _rafService.ChangeStatusAsync(Id);
            return RedirectToAction("Index", "Raf");
        }
    }
}
