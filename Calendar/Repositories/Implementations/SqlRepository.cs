using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web.Migrations;
using Web.Models.Entities;
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
            return dbSet.FirstOrDefaultAsync(i => i.Id == id);
        }

        public Task<List<TEntity>> GetByIdsAsync(int[] ids)
        {
            return dbSet.Where(i => ids.Contains(i.Id)).ToListAsync();
        }

        public async Task<TEntity> AddAsync(TEntity item)
        {
            dbSet.Add(item);
            await context.SaveChangesAsync();

            return item;
        }

        public Task<List<TEntity>> GetAllAsync()
        {
            return dbSet.ToListAsync();
        }

        public async Task<TEntity> UpdateAsync(TEntity item)
        {
            context.Entry(item).State = EntityState.Modified;
            await context.SaveChangesAsync();

            return item;
        }

        public async Task<TEntity> DeleteAsync(int id)
        {
            var item = await GetByIdAsync(id);
            context.Remove(item);
            await context.SaveChangesAsync();

            return item;
        }

        public void Dispose()
        {
            context?.Dispose();
        }
    }
}
