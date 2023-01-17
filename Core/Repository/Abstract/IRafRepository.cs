using Entities.Entity.Concrete;


namespace Core.Repository.Abstract
{
    public interface IRafRepository : IGenericRepository<Raf>
    {
        Task<IEnumerable<dynamic>?> RafGetAllAsync();
    }
}
