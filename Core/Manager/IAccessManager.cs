using Entities.Entity.Concrete;

namespace Core.Manager
{
    public interface IAccessManager
    {
        public Task<Kullanici> Access(string username, string password);
    }
}
