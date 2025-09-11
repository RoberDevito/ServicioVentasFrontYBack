using System.Threading.Tasks;
using Volo.Abp.DependencyInjection;

namespace Servicios.Data;

/* This is used if database provider does't define
 * IServiciosDbSchemaMigrator implementation.
 */
public class NullServiciosDbSchemaMigrator : IServiciosDbSchemaMigrator, ITransientDependency
{
    public Task MigrateAsync()
    {
        return Task.CompletedTask;
    }
}
