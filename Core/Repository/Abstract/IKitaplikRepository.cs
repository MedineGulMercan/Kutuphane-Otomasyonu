using Entities.Entity.Concrete;

namespace Core.Repository.Abstract
{
    public interface IKitaplikRepository : IGenericRepository<Kitaplik>
    {
        Task<IEnumerable<dynamic>?> KitaplikGetAllAsync();
    }
}
