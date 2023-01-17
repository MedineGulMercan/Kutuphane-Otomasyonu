using Core.Manager;
using Entities.Entity.Concrete;
using Microsoft.AspNetCore.Authentication.Cookies;
using Service.Services.Abstract;
using System.Security.Claims;
namespace MySites.Manager
{
    public class ClaimsManager : IClaimsManager
    {
        private readonly IRolService _rolService;
        private readonly IRolDtoService _rolDtoService;
        public ClaimsManager(IRolService rolService, IRolDtoService rolDtoService)
        {
            _rolService = rolService;
            _rolDtoService = rolDtoService;
        }

        public async Task<ClaimsPrincipal> CreateClaim(Kullanici kullanci)
        {
            var roller = await _rolDtoService.GetAllAsync();
            var rollerWhere = roller.Where(w => w.KullaniciId == kullanci.Id); //giriş yapan kullanıcının Id sine göre ona tanımlı olan rolleri olduğunu rollerwhere değişkenine attık.

            var rollerinIsimleri = await _rolService.GetAllAsync();

            //claim(talep etmek) c# ın içinde olan bir kütüphanedir.
            var claims = new List<Claim>()
            {
                new Claim(ClaimTypes.Name, kullanci.KullaniciAdi)
            };

            foreach (var rol in rollerWhere)
            {
                //yukarda rollerwhere de kişinin rollerinin Idsini tutuyoruz. burada ise döngü ile rollerin isimlerini
                //rolismi değişkeninde tutuyoruz.
                var rolismi = rollerinIsimleri.FirstOrDefault(w => w.Id == rol.RolId).RolAdi;
                claims.Add(new Claim(ClaimTypes.Role, rolismi));
            }


            //giriş yapan kullanıcıların bilgilerini cookie ye atıyorum. cookieye attıktan sonra 
            //giriş yapan kullanıcının erişim yetkilerine erişebiliyoruz.
            var claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
            var claimsPrincipal = new ClaimsPrincipal(claimsIdentity);
            return claimsPrincipal;
        }
    }
}
