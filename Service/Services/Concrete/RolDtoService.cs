using Core.Repository.Abstract;
using Entities.Entity.Concrete;
using Service.Services.Abstract;

namespace Service.Services.Concrete
{
    public class RolDtoService : GenericService<RolDto>, IRolDtoService
    {
        private readonly IRolDtoRepository _rolDtoRepository;
        public RolDtoService(IGenericRepository<RolDto> repository, IRolDtoRepository rolDtoRepository) : base(repository)
        {
            _rolDtoRepository = rolDtoRepository;
        }
    }
}
