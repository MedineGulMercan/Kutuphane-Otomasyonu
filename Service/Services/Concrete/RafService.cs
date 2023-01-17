using Core.Repository.Abstract;
using Core.Repository.Concrete;
using Entities.Entity.Concrete;
using Service.Services.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Services.Concrete
{
    public class RafService : GenericService<Raf>, IRafService
    {
        private readonly IRafRepository _rafRepository;
        public RafService(IGenericRepository<Raf> repository, IRafRepository rafRepository) : base(repository)
        {
            _rafRepository = rafRepository;
        }
        public async Task<IEnumerable<dynamic>?> RafGetAllAsync()
        {
            var result = await _rafRepository.RafGetAllAsync();
            return result;
        }
    }
}
