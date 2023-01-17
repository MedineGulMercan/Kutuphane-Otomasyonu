using Core.Repository.Abstract;
using Core.Repository.Concrete;
using Entities.Entity.Concrete;
using Service.Services.Abstract;


namespace Service.Services.Concrete
{
    public class KitaplikService : GenericService<Kitaplik>, IKitaplikService
    {
        private readonly IKitaplikRepository _kitaplikRepository;
        public KitaplikService(IGenericRepository<Kitaplik> repository, IKitaplikRepository kitaplikRepository) : base(repository)
        {
            _kitaplikRepository = kitaplikRepository;
        }
        public async Task<IEnumerable<dynamic>?> KitaplikGetAllAsync()
        {
            var result = await _kitaplikRepository.KitaplikGetAllAsync();
            return result;
        }
    }
}
