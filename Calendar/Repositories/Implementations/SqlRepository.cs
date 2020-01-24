using Domain.Models;
using Infrastructure;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web.Repositories.Contracts;

namespace Web.Repositories
{
    public class SqlRepository<TEntity> : IDatabaseRepository<TEntity> where TEntity : EntityBase
    {
        private readonly AppDbContext context;
        private readonly DbSet<TEntity> dbSet;

        public SqlRepository(AppDbContext appDbContext)
        {
            context = appDbContext;
            dbSet = context.Set<TEntity>();
        }

        public Task<TEntity> GetByIdAsync(int id)
        {
            return QueryAll().FirstOrDefaultAsync(i => i.Id == id);
        }

        public Task<List<TEntity>> GetByIdsAsync(int[] ids)
        {
            return QueryAll().Where(i => ids.Contains(i.Id)).ToListAsync();
        }

        public IQueryable<TEntity> QueryAll()
        {
            return dbSet.AsQueryable();
        }

        public void Dispose()
        {
            throw new NotImplementedException();
        }
    }
}
