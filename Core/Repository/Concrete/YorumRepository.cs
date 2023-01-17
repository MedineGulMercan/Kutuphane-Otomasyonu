using Core.Repository.Abstract;
using Entities.Entity.Concrete;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;
using System.Data;
using Dapper;

namespace Core.Repository.Concrete
{
    public class YorumRepository : GenericRepository<Yorum>, IYorumRepository
    {
        private readonly IConfiguration _configuration;
        public YorumRepository(IConfiguration configuration) : base(configuration)
        {
            _configuration = configuration;
        }
        public IDbConnection Connection() => new SqlConnection(_configuration.GetSection("ConnectionStrings")["sqlConnection"]);
        public async Task<IEnumerable<dynamic>>? YorumGetirDto()
        {
            try
            {
                using (var con = Connection())
                {
                    con.Open();
                    var result = await con.QueryAsync<dynamic>($"sp_YorumGetirDto", commandType: CommandType.StoredProcedure);
                    con.Close();
                    return result;
                }
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
