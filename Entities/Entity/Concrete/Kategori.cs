using Entities.Entity.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Entity.Concrete
{
    public class Kategori : BaseEntity
    {
        public string? KategoriAdi { get; set; }
        public bool? Aktifmi { get; set; }
    }
}
