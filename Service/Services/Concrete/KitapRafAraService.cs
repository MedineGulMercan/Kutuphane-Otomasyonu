using Core.Repository.Abstract;
using Entities.Entity.Concrete;
using Service.Services.Abstract;

namespace Service.Services.Concrete
{
    public class KitapRafAraService : GenericService<KitapRafAra>, IKitapRafAraService
    {
        private readonly IKirapRafAraRepository _kirapRafAraRepository;
        public KitapRafAraService(IGenericRepository<KitapRafAra> repository, IKirapRafAraRepository kirapRafAraRepository) : base(repository)
        {
            _kirapRafAraRepository = kirapRafAraRepository;
        }
    }
}
