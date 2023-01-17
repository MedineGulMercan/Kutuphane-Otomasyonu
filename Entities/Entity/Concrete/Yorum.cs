using Entities.Entity.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Entity.Concrete
{
    public class Yorum : BaseEntity
    {
        public int KitapId { get; set; }
        public int UserId { get; set; }
        public string? Metin { get; set; }
    }
}
