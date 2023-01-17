
using Core.Repository.Abstract;
using Entities.Entity.Concrete;
using Service.Services.Abstract;

namespace Service.Services.Concrete
{
    public class RolService : GenericService<Rol>, IRolService
    {
        private readonly IRolRepository _rolRepository;
        public RolService(IGenericRepository<Rol> repository, IRolRepository rolRepository) : base(repository)
        {
            _rolRepository = rolRepository;
        }
    }
}
