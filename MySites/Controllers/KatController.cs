using Entities.Entity.Concrete;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Service.Services.Abstract;
using System.Data;

namespace MySites.Controllers
{
    [Authorize(Roles = "Admin")]
    public class KatController : Controller
    {
        public readonly IKatService _katService;

        public KatController(IKatService katService)
        {
            _katService = katService;
        }

        public IActionResult Index()
        {
            return View();
        }
        [HttpGet]
        public async Task<IActionResult> KatGetAll()
        {
            var katlar = await _katService.GetAllAsync();
            return Json(katlar.Where(x=>x.AktifMi==true));
        }

        [HttpPost]
        public async Task<IActionResult> KatEkle(Kat kat)
        {
            kat.AktifMi = true;
            await _katService.CreateAsync(kat);
            return RedirectToAction("Index","Kat");
        }

        [HttpPost]
        public async Task<IActionResult> KatGuncelle(Kat kat)
        {
            await _katService.UpdateAsync(kat);
            return RedirectToAction("Index", "Kat");
        }

        [HttpPost]
        public async Task<IActionResult> KatAktiflikSil(int Id)
        {
            await _katService.ChangeStatusAsync(Id);
            return RedirectToAction("Index", "Kat");
        }
    }
}
