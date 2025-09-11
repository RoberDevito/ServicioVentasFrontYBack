using Volo.Abp.Modularity;

namespace Servicios;

public abstract class ServiciosApplicationTestBase<TStartupModule> : ServiciosTestBase<TStartupModule>
    where TStartupModule : IAbpModule
{

}
