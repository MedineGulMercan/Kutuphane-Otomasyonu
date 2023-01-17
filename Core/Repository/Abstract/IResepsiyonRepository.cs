using Entities.Entity.Concrete;

namespace Core.Repository.Abstract
{
    public interface IResepsiyonRepository : IGenericRepository<Resepsiyon>
    {
        Task<IEnumerable<dynamic>?> ResepsiyonGetAllAsync();
    }
}
