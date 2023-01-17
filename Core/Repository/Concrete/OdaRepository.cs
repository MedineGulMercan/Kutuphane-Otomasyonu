using Core.Repository.Abstract;
using Entities.Entity.Concrete;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper;

namespace Core.Repository.Concrete
{
    public class OdaRepository : GenericRepository<Oda>, IOdaRepository
    {
        private readonly IConfiguration _configuration;
        private readonly string? _sqlCon;
        public OdaRepository(IConfiguration configuration) : base(configuration)
        {
            _configuration = configuration;
            _sqlCon = _configuration.GetSection("ConnectionStrings")["sqlConnection"];
        }
        public IDbConnection Connection() => new SqlConnection(_sqlCon);
        public async Task<IEnumerable<dynamic>?> OdaGetAllAsync()
        {
            using (var con = Connection())
            {
                con.Open();
                var result = await con.QueryAsync<dynamic>($"sp_OdaDtoGetir", commandType: CommandType.StoredProcedure);
                con.Close();
                return result.ToList();
            }
        }
    }
}
