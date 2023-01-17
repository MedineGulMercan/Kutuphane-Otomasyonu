using Entities.Entity.Concrete;

namespace Service.Services.Abstract
{
    public interface IKitaplikService : IGenericService<Kitaplik>
    {
        Task<IEnumerable<dynamic>?> KitaplikGetAllAsync();
    }
}
