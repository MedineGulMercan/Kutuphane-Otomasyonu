using Entities.Entity.Concrete;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MySites.Extensions;
using Service.Services.Abstract;
using System.Data;

namespace MySites.Controllers
{
    [Authorize(Roles = "Kullanici,Admin")]
    public class KitapAyrintiController : Controller
    {
        private readonly IKitapService _kitapService;
        private readonly IYorumService _yorumService;
        public KitapAyrintiController(IKitapService kitapService, IYorumService yorumService)
        {
            _kitapService = kitapService;
            _yorumService = yorumService;
        }
        [HttpGet]
        public IActionResult Index(int Id)
        {
            var user = HttpContext.Session.GetObject<Kullanici>("aktifKullanıcı");
            ViewBag.Id = Id;
            ViewBag.UserId = user.Id;
            return View();
        }
        [HttpGet]
        public async Task<IActionResult> KitapGetir(int Id)
        {
            var kitap = _kitapService.KitapGetAllAsync().Result.Where(x=>x.Id == Id);
            return Json(kitap);
        }
        [HttpGet]
        public async Task<IActionResult> YorumGetAll(int Id)
        {
            var kitap = await _yorumService.YorumGetirDto();
            return Json(kitap.Where(x=>x.KitapId == Id));
        }
        [HttpPost]
        public async Task YorumEkle(Yorum yorum)
        {
            var user = HttpContext.Session.GetObject<Kullanici>("aktifKullanıcı");
            yorum.UserId = user.Id;
            await _yorumService.CreateAsync(yorum);
        }
        [HttpPost]
        public async Task YorumSil(int Id)
        {
            await _yorumService.DeleteAsync(Id);
        }
    }
}
