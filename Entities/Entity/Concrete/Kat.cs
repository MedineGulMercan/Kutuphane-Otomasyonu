using Entities.Entity.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Entity.Concrete
{
    public class Kat : BaseEntity
    {
        public string? KatAdi { get; set; }
        public bool AktifMi { get; set; }
    }
}
