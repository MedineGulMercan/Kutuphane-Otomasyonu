using Core.Repository.Abstract;
using Microsoft.Extensions.Configuration;
using System.Data;
using System.Data.SqlClient;
using Dapper;
using static Dapper.SqlMapper;

namespace Core.Repository.Concrete
{
    public class GenericRepository<T> : IGenericRepository<T> where T : class
    {
        private readonly IConfiguration _configuration;
        private readonly string? _tableName;
        private readonly string? _sqlCon;
        private string? _proc;

        public GenericRepository(IConfiguration configuration)
        {
            _tableName = typeof(T).Name;
            _configuration = configuration;
            _sqlCon = _configuration.GetSection("ConnectionStrings")["sqlConnection"];
        }

        public IDbConnection Connection() => new SqlConnection(_sqlCon);

        public async Task ChangeStatusAsync(int? id)
        {
            using (var con = Connection())
            {
                con.Open();
                await con.ExecuteAsync($"UPDATE [{_tableName}] SET AktifMi=0 WHERE Id = @Id", new { Id = id });
                con.Close();
            }
        }

        public async Task CreateAsync(T? entity)
        {
            using (var con = Connection())
            {
                con.Open();
                _proc = $"sp_{_tableName}Ekle";
                await con.ExecuteAsync(_proc, entity, commandType: CommandType.StoredProcedure);
                con.Close();
            }
        }

        public async Task DeleteAsync(int? id)
        {
            using (var con = Connection())
            {
                con.Open();
                await con.ExecuteAsync($"DELETE FROM {_tableName} WHERE Id={id}");
                con.Close();
            }
        }

        public async Task<IEnumerable<T>?> GetAllAsync()
        {
            using (var con = Connection())
            {
                con.Open();
                var result = await con.QueryAsync<T?>($"select * from {_tableName}");
                con.Close();
                return result.ToList();
            }
        }
        public async Task<T?> GetAsync(int? id)
        {
            using (var con = Connection())
            {
                con.Open();
                var result = await con.QuerySingleOrDefaultAsync<T?>($"SELECT * FROM [{_tableName}] WHERE Id = @Id", new { Id = id });
                con.Close();
                return result;
            }
        }
        public async Task UpdateAsync(T? entity)
        {
            using (var con = Connection())
            {
                con.Open();
                _proc = $"sp_{_tableName}Guncelle";
                await con.ExecuteAsync(_proc, entity, commandType: CommandType.StoredProcedure);
                con.Close();
            }
        }
    }
}
