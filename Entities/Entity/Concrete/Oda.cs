using Entities.Entity.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Entity.Concrete
{
    public class Oda : BaseEntity
    {
        public int KatId { get; set; }
        public string? OdaAdi { get; set; }
        public bool AktifMi { get; set; }
    }
}
