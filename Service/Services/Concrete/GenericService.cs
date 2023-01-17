using Core.Repository.Abstract;
using Service.Services.Abstract;

namespace Service.Services.Concrete
{
    public class GenericService<T> : IGenericService<T> where T : class
    {
        private readonly IGenericRepository<T> _repository;

        public GenericService(IGenericRepository<T> repository)
        {
            _repository = repository;
        }

        public async Task ChangeStatusAsync(int? id)
        {
            await _repository.ChangeStatusAsync(id);
        }

        public async Task CreateAsync(T? entity)
        {
            await _repository.CreateAsync(entity);
        }

        public async Task DeleteAsync(int? id)
        {
            await _repository.DeleteAsync(id);
        }
        public async Task<IEnumerable<T?>> GetAllAsync()
        {
            return await _repository.GetAllAsync();
        }
        public async Task<T?> GetAsync(int? id)
        {
            return await _repository.GetAsync(id);
        }
        public async Task UpdateAsync(T? entity)
        {
            await _repository.UpdateAsync(entity);
        }
    }
}
