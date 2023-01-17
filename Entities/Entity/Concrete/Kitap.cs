using Entities.Entity.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Entity.Concrete
{
    public class Kitap : BaseEntity
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
        public int KitapStok { get; set; }
        public string? KitapResimYolu { get; set; }


    }
}
