using Entities.Entity.Concrete;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Service.Services.Abstract;
using System.Data;

namespace MySites.Controllers
{
    [Authorize(Roles = "Admin")]
    public class OdaController : Controller
    {
        public readonly IOdaService _odaService;
        public readonly IKatService _katService;

        public OdaController(IOdaService odaService, IKatService katService)
        {
            _odaService = odaService;
            _katService = katService;
        }

        public IActionResult Index()
        {
            return View();
        }
        [HttpGet]
        public async Task<IActionResult> OdaGetAll()
        {
           var odalar= await _odaService.OdaGetAllAsync();
           return Json(odalar.Where(x=>x.AktifMi==true));
        }
        [HttpGet]
        public async Task<IActionResult> KatGetAll()
        {
            
            var katlar = await _katService.GetAllAsync();
            return Json(katlar.Where(x => x.AktifMi == true));
        }

        [HttpPost]
        public async Task<IActionResult> OdaEkle(Oda oda)
        {
            oda.AktifMi = true;
            await _odaService.CreateAsync(oda);
            return RedirectToAction("Index", "Oda");
        }

        [HttpPost]
        public async Task<IActionResult> OdaGuncelle(Oda oda)
        {
            await _odaService.UpdateAsync(oda);
            return RedirectToAction("Index", "Oda");
        }

        [HttpPost]
        public async Task<IActionResult> OdaAktiflikSil(int Id)
        {
            await _odaService.ChangeStatusAsync(Id);
            return RedirectToAction("Index", "Oda");
        }

    }
}
