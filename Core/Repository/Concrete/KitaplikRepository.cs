using Core.Repository.Abstract;
using Dapper;
using Entities.Entity.Concrete;
using Microsoft.Extensions.Configuration;
using System.Data;
using System.Data.SqlClient;

namespace Core.Repository.Concrete
{
    public class KitaplikRepository : GenericRepository<Kitaplik>, IKitaplikRepository
    {
        private readonly IConfiguration _configuration;
        private readonly string? _sqlCon;
        public KitaplikRepository(IConfiguration configuration) : base(configuration)
        {
            _configuration = configuration;
            _sqlCon = _configuration.GetSection("ConnectionStrings")["sqlConnection"];
        }
        public IDbConnection Connection() => new SqlConnection(_sqlCon);
        public async Task<IEnumerable<dynamic>?> KitaplikGetAllAsync()
        {
            using (var con = Connection())
            {
                con.Open();
                var result = await con.QueryAsync<dynamic>($"sp_KitaplikGetirDto", commandType: CommandType.StoredProcedure);
                con.Close();
                return result.ToList();
            }
        }
    }
}
