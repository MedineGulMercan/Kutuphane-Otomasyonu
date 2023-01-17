
using Entities.Entity.Abstract;

namespace Entities.Entity.Concrete
{
    public class Resepsiyon : BaseEntity
    {
        public int KitapId { get; set; }
        public int KullaniciId { get; set; }
        public int SorumluId { get; set; }
        public bool TeslimEdildi { get; set; }
    }
}
