using Entities.Entity.Concrete;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Services.Abstract
{
    public interface IOdaService : IGenericService<Oda>
    {
        Task<IEnumerable<dynamic>?> OdaGetAllAsync();
    }
}
