
using Entities.Entity.Abstract;

namespace Entities.Entity.Concrete
{
    public class KitapAyrintiDto : BaseEntity
    {
        public string? KitapSeriNo { get; set; }
        public string? KitapAdi { get; set; }
        public string? KitapYazari { get; set; }
        public string? KitapSayfaSayisi { get; set; }
        public string? KitapYayinEvi { get; set; }
        public string? KitapBasimYili { get; set; }
        public string? KitapOzeti { get; set; }
        public string? KitapKonusu { get; set; }
        public int KategoriId { get; set; }
        public string? KategoriAdi { get; set; }
        public int KitapStok { get; set; }
        public string? KitapResimYolu { get; set; }
        public int RafId { get; set; }
        public string? RafAdi { get; set; }
        public int KitaplikId { get; set; }
        public string? KitaplikAdi { get; set; }
        public int OdaId { get; set; }
        public string? OdaAdi { get; set; }
        public int KatId { get; set; }
        public string? KatAdi { get; set; }
    }
}
