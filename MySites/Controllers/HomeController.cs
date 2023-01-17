using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MySites.Models;
using Service.Services.Abstract;
using Service.Services.Concrete;
using System.Diagnostics;

namespace MySites.Controllers
{
    [Authorize(Roles = "Kullanici,Admin")]
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly IKitapService _kitapService;
        private readonly IYorumService _yorumService;
        public HomeController(ILogger<HomeController> logger, IKitapService kitapService, IYorumService yorumService)
        {
            _logger = logger;
            _kitapService = kitapService;
            _yorumService = yorumService;
        }
        [HttpGet]
        public IActionResult Index()
        {
            return View();
        }
        [HttpGet]
        public IActionResult Privacy()
        {
            return RedirectToAction("Index", "Home");
        }
        [HttpGet]
        public async Task<IActionResult> KitapGetAll()
        {
            var kitaplar = await _kitapService.GetAllAsync();
            return Json(kitaplar.OrderByDescending(x => x.Id).Take(3));
        }
        [HttpGet]
        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
        [HttpGet]
        public async Task<IActionResult> YorumGetAll()
        {
            var kitap = await _yorumService.YorumGetirDto();
            return Json(kitap.OrderByDescending(x=>x.Id).Take(3));
        }
    }
}