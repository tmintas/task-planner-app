using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Web.Repositories.Contracts
{
    public interface IDatabaseRepository<TEntity> : IDisposable
    {
        Task<List<TEntity>> GetAllAsync();

        Task<TEntity> GetByIdAsync(int id);

        Task<List<TEntity>> GetByIdsAsync(int[] ids);

        Task<TEntity> AddAsync(TEntity item);

        Task<TEntity> UpdateAsync(TEntity item);

        Task<TEntity> DeleteAsync(TEntity item);
    }
}
