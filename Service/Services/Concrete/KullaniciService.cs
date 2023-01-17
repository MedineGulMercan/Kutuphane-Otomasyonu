using Core.Repository.Abstract;
using Entities.Entity.Concrete;
using Service.Services.Abstract;

namespace Service.Services.Concrete
{
    public class KullaniciService : GenericService<Kullanici>, IKullaniciService
    {
        private readonly IKullaniciRepository _kullaniciRepository;
        public KullaniciService(IGenericRepository<Kullanici> repository, IKullaniciRepository kullaniciRepository) : base(repository)
        {
            _kullaniciRepository = kullaniciRepository;
        }
    }
}
