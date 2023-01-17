using Entities.Entity.Concrete;
using System.Security.Claims;

namespace Core.Manager
{
    public interface IClaimsManager
    {
        public Task<ClaimsPrincipal> CreateClaim(Kullanici webUser);
    }
}
