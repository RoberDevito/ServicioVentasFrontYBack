using Volo.Abp.Modularity;

namespace Servicios;

/* Inherit from this class for your domain layer tests. */
public abstract class ServiciosDomainTestBase<TStartupModule> : ServiciosTestBase<TStartupModule>
    where TStartupModule : IAbpModule
{

}
