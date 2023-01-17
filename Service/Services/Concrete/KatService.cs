using Core.Repository.Abstract;
using Entities.Entity.Concrete;
using Service.Services.Abstract;


namespace Service.Services.Concrete
{
    public class KatService : GenericService<Kat>, IKatService
    {
        public KatService(IGenericRepository<Kat> repository) : base(repository)
        {
        }
    }
}
