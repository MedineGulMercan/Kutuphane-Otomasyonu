using Entities.Entity.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Entity.Concrete
{
    public class Raf : BaseEntity
    {
        public int KatId { get; set; }
        public int OdaId { get; set; }
        public int KitaplikId { get; set; }
        public string? RafAdi { get; set; }
        public bool AktifMi { get; set; } 
    }
}
