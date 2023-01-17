using Entities.Entity.Concrete;


namespace Service.Services.Abstract
{
    public interface IKitapService : IGenericService<Kitap>
    {
        Task<IEnumerable<KitapAyrintiDto>?> KitapGetAllAsync();
    }
}
