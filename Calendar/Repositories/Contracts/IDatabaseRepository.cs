using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Web.Repositories.Contracts
{
    public interface IDatabaseRepository<TEntity> : IDisposable
    {
        IQueryable<TEntity> QueryAll();

        Task<TEntity> GetByIdAsync(int id);

        Task<List<TEntity>> GetByIdsAsync(int[] ids);
    }
}
