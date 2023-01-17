using Core.Repository.Abstract;
using Core.Repository.Concrete;
using Entities.Entity.Concrete;
using Service.Services.Abstract;


namespace Service.Services.Concrete
{
    public class KitapService : GenericService<Kitap>, IKitapService

    {
        private readonly IKitapRepository _kitapRepository;
        public KitapService(IGenericRepository<Kitap> repository, IKitapRepository kitapRepository) : base(repository)
        {
            _kitapRepository = kitapRepository;
        }
        public async Task<IEnumerable<KitapAyrintiDto>?> KitapGetAllAsync()
        {
            var result = await _kitapRepository.KitapGetAllAsync();
            return result;
        }
    }
}
