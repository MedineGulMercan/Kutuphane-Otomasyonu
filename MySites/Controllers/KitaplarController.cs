using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Service.Services.Abstract;

namespace MySites.Controllers
{
    [Authorize(Roles = "Kullanici,Admin")]
    public class KitaplarController : Controller
    {
        private readonly IKitapService _kitapService;
        private readonly IKategoriService _kategoriService;

        public KitaplarController(IKitapService kitapService, IKategoriService kategoriService)
        {
            _kitapService = kitapService;
            _kategoriService = kategoriService;
        }

        public IActionResult Index()
        {
            return View();
        }
        [HttpGet]
        public async Task<IActionResult> KitapGetAll(int Id)
        {
            if (Id == 0)
            {
                var kitaplar = await _kitapService.GetAllAsync();
                return Json(kitaplar);
            }
            else
            {
                var kitaplar = await _kitapService.GetAllAsync();
                return Json(kitaplar.Where(x => x.KategoriId == Id));
            }

        }
        [HttpGet]
        public async Task<IActionResult> KategoriGetAll()
        {
            var kategoriler = await _kategoriService.GetAllAsync();
            return Json(kategoriler);
        }
    }
}
