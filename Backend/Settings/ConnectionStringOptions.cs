using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace Web.Settings
{
    public class ConnectionStringOptions : IConfigureNamedOptions<DbContextOptionsBuilder>
    {
        readonly ConnectionStringSettings connectionStringSettings;

        public ConnectionStringOptions(ConnectionStringSettings connectionStringSettings)
        {
            this.connectionStringSettings = connectionStringSettings;
        }

        public void Configure(string name, DbContextOptionsBuilder options)
        {
            options.UseSqlServer(connectionStringSettings.DevConnection);
        }

        public void Configure(DbContextOptionsBuilder options)
        {
            Configure(Options.DefaultName, options);
        }
    }
}
