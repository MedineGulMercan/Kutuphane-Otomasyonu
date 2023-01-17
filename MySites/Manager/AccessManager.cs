using Core.Manager;
using Entities.Entity.Concrete;
using Service.Services.Abstract;
namespace MySites.Manager
{
    public class AccessManager : IAccessManager
    {
        public int UserId { get; set; }

        private readonly IKullaniciService _kullaniciService;
        public AccessManager(IKullaniciService kullaniciServic)
        {
            _kullaniciService = kullaniciServic;
        }

        //ön taraftan gelen kullanıcı adı ve şifreyi burada tutuyoruz.
        public async Task<Kullanici> Access(string username, string password)
        {
            var users = await _kullaniciService.GetAllAsync();
            //bu linq sorgusudur. firstordefault sorgudan gelen ilk veriyi bize gösterir.
            var login = users.FirstOrDefault(w => w.KullaniciAdi == username && w.Sifre == password);

            if (login != null)
            {
                UserId = login.Id;
                return login;
            }
            else
                return null;
        }
    }
}
