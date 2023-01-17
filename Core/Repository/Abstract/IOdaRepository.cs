using Entities.Entity.Concrete;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Repository.Abstract
{
    public interface IOdaRepository : IGenericRepository<Oda>
    {
        Task<IEnumerable<dynamic>?> OdaGetAllAsync();
    }
}
