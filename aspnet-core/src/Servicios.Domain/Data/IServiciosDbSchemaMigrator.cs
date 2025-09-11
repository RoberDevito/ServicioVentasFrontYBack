using System.Threading.Tasks;

namespace Servicios.Data;

public interface IServiciosDbSchemaMigrator
{
    Task MigrateAsync();
}
