using Core.Repository.Abstract;
using Dapper;
using Entities.Entity.Concrete;
using Microsoft.Extensions.Configuration;
using System.Data;
using System.Data.SqlClient;

namespace Core.Repository.Concrete
{
    public class RafRepository : GenericRepository<Raf>, IRafRepository
    {
        private readonly IConfiguration _configuration;
        private readonly string? _sqlCon;
        public RafRepository(IConfiguration configuration) : base(configuration)
        {
            _configuration = configuration;
            _sqlCon = _configuration.GetSection("ConnectionStrings")["sqlConnection"];
        }
        public IDbConnection Connection() => new SqlConnection(_sqlCon);
        public async Task<IEnumerable<dynamic>?> RafGetAllAsync()
        {
            using (var con = Connection())
            {
                con.Open();
                var result = await con.QueryAsync<dynamic>($"sp_RafGetirDto", commandType: CommandType.StoredProcedure);
                con.Close();
                return result.ToList();
            }
        }
    }
}
