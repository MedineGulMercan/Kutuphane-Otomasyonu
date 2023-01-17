using Core.Repository.Abstract;
using Entities.Entity.Concrete;
using Microsoft.Extensions.Configuration;

namespace Core.Repository.Concrete
{
    public class RolRepository : GenericRepository<Rol>, IRolRepository
    {
        public RolRepository(IConfiguration configuration) : base(configuration)
        {
        }
    }
}
