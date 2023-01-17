namespace Service.Services.Abstract
{
    public interface IGenericService<T> where T : class
    {
        Task CreateAsync(T? entity);
        Task UpdateAsync(T? entity);
        Task DeleteAsync(int? id);
        Task<IEnumerable<T?>> GetAllAsync();
        Task<T?> GetAsync(int? id);
        Task ChangeStatusAsync(int? id);
    }
}
