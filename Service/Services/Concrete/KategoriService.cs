using Core.Repository.Abstract;
using Entities.Entity.Concrete;
using Microsoft.Extensions.Configuration;
using Service.Services.Abstract;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper;

namespace Service.Services.Concrete
{
    public class KategoriService : GenericService<Kategori> , IKategoriService
    {
        private readonly IKategoriRepository _kategoriRepository;
        private readonly IConfiguration _configuration;
        public KategoriService(IGenericRepository<Kategori> repository, IKategoriRepository kategoriRepository, IConfiguration configuration) : base(repository)
        {
            _kategoriRepository = kategoriRepository;
            _configuration = configuration;
        }
        public IDbConnection Connection() => new SqlConnection(_configuration.GetSection("ConnectionStrings")["sqlConnection"]);

        public async Task? KategoriAktiflikSil(int id) 
        {
            //using içindeki işlem bittikten sonra hafizadan temizliyor. (garbage collector) 
            using(var con = Connection())
            {
                con.Open();
                await con.ExecuteAsync($"update Kategori set Aktifmi = 0 where Id={id}"); //dolar koyunca yukarıdaki int id yi görüyor.
                con.Close();
            }
        }
    }
}
