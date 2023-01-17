using Entities.Entity.Concrete;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Service.Services.Abstract;
using Service.Services.Concrete;
using System.Data;

namespace MySites.Controllers
{
    [Authorize(Roles = "Admin")]
    public class KitaplikController : Controller
    {
        public readonly IKitaplikService _kitaplikService;
        public readonly IKatService _katService;
        public readonly IOdaService _odaService;

        public KitaplikController(IKitaplikService kitaplikService, IKatService katService, IOdaService odaService)
        {
            _kitaplikService = kitaplikService;
            _katService = katService;
            _odaService = odaService;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public async Task<IActionResult> KitaplikGetAll()
        {
            var kitapliklar = await _kitaplikService.KitaplikGetAllAsync();
            return Json(kitapliklar.Where(x => x.AktifMi == true));
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

        [HttpPost]
        public async Task<IActionResult> KitapEkle(Kitaplik kitaplik)
        {
            kitaplik.AktifMi = true;
            await _kitaplikService.CreateAsync(kitaplik);
            return RedirectToAction("Index", "Kitaplik");
        }

        [HttpPost]
        public async Task<IActionResult> KitapGuncelle(Kitaplik kitaplik)
        {
            await _kitaplikService.UpdateAsync(kitaplik);
            return RedirectToAction("Index", "Kitaplik");
        }

        [HttpPost]
        public async Task<IActionResult> KitaplikAktiflikSil(int Id)
        {
            await _kitaplikService.ChangeStatusAsync(Id);
            return RedirectToAction("Index", "Kitaplik");

        }
    }
}
