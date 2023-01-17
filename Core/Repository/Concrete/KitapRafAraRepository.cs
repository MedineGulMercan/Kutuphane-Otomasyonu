using Core.Repository.Abstract;
using Entities.Entity.Concrete;
using Microsoft.Extensions.Configuration;

namespace Core.Repository.Concrete
{
    public class KitapRafAraRepository : GenericRepository<KitapRafAra>, IKirapRafAraRepository
    {
        public KitapRafAraRepository(IConfiguration configuration) : base(configuration)
        {
        }
    }
}
