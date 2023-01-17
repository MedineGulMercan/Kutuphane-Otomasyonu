using Core.Repository.Abstract;
using Entities.Entity.Concrete;
using Microsoft.Extensions.Configuration;

namespace Core.Repository.Concrete
{
    public class RolDtoRepository : GenericRepository<RolDto> , IRolDtoRepository
    {
        public RolDtoRepository(IConfiguration configuration) : base(configuration)
        {
        }
    }
}
