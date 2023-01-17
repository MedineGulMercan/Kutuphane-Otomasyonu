namespace Core.Repository.Abstract
{
    public interface IGenericRepository<T> where T : class
    {
        Task CreateAsync(T? entity);
        Task UpdateAsync(T? entity);
        Task DeleteAsync(int? id);
        Task<IEnumerable<T?>> GetAllAsync();
        Task<T?> GetAsync(int? id);
        Task ChangeStatusAsync(int? id);
    }
}
