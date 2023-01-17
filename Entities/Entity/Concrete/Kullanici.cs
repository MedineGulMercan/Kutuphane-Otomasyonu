using Entities.Entity.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Entity.Concrete 
{
    public class Kullanici : BaseEntity
    {
        
        public string? KullaniciAdi { get; set; }
        public string? Sifre { get; set; }
        public string? Isim { get; set; }
        public string? Soyisim { get; set; }
        public string? DT { get; set; }
        public string? TC { get; set; }
        public string? Mail{ get; set; }
        public string? Telefon { get; set; }
        public string? Adres { get; set; }
        public string? Teliki { get; set; }

    }
}
