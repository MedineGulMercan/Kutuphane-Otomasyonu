using Core.Repository.Abstract;
using Entities.Entity.Concrete;
using Microsoft.Extensions.Configuration;


namespace Core.Repository.Concrete
{
    public class KategoriRepository : GenericRepository<Kategori>, IKategoriRepository
    {
        public KategoriRepository(IConfiguration configuration) : base(configuration)
        {
        }
    }
}
