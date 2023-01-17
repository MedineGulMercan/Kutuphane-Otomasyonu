using Core.Repository.Abstract;
using Entities.Entity.Concrete;
using Service.Services.Abstract;

namespace Service.Services.Concrete
{
    public class YorumService : GenericService<Yorum>, IYorumService
    {
        private readonly IYorumRepository _yorumRepository;
        public YorumService(IGenericRepository<Yorum> repository, IYorumRepository yorumRepository) : base(repository)
        {
            _yorumRepository = yorumRepository;
        }

        public async Task<IEnumerable<dynamic>>? YorumGetirDto()
        {
            var result = await _yorumRepository.YorumGetirDto();
            return result;
        }
    }
}
