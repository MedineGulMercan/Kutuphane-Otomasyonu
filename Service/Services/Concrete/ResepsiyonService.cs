
using Core.Repository.Abstract;
using Core.Repository.Concrete;
using Entities.Entity.Concrete;
using Service.Services.Abstract;

namespace Service.Services.Concrete
{
    public class ResepsiyonService : GenericService<Resepsiyon>, IResepsiyonService
    {
        private readonly IResepsiyonRepository _resepsiyonRepository;
        public ResepsiyonService(IGenericRepository<Resepsiyon> repository, IResepsiyonRepository resepsiyonRepository) : base(repository)
        {
            _resepsiyonRepository = resepsiyonRepository;
        }
        public async Task<IEnumerable<dynamic>?> ResepsiyonGetAllAsync()
        {
            var result = await _resepsiyonRepository.ResepsiyonGetAllAsync();
            return result;
        }
    }
}
