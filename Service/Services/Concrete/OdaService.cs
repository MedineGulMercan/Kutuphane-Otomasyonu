using Core.Repository.Abstract;
using Entities.Entity.Concrete;
using Service.Services.Abstract;


namespace Service.Services.Concrete
{
    public class OdaService : GenericService<Oda>, IOdaService
    {
        private readonly IOdaRepository _odaRepository;
        public OdaService(IGenericRepository<Oda> repository, IOdaRepository odaRepository) : base(repository)
        {
            _odaRepository = odaRepository;
        }
        public async Task<IEnumerable<dynamic>?> OdaGetAllAsync()
        {
            var result = await _odaRepository.OdaGetAllAsync();
            return result;
        }
    }
}
