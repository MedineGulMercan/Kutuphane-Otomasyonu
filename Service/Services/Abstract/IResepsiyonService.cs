
using Entities.Entity.Concrete;

namespace Service.Services.Abstract
{
    public interface IResepsiyonService : IGenericService<Resepsiyon>
    {
        Task<IEnumerable<dynamic>?> ResepsiyonGetAllAsync();
    }
}
