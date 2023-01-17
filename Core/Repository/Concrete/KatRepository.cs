using Core.Repository.Abstract;
using Entities.Entity.Concrete;
using Microsoft.Extensions.Configuration;


namespace Core.Repository.Concrete
{
    public class KatRepository : GenericRepository<Kat>, IKatRepository
    {
        public KatRepository(IConfiguration configuration) : base(configuration)
        {
        }
    }
}
