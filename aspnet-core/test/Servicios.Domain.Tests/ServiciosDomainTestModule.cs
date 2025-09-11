using Volo.Abp.Modularity;

namespace Servicios;

[DependsOn(
    typeof(ServiciosDomainModule),
    typeof(ServiciosTestBaseModule)
)]
public class ServiciosDomainTestModule : AbpModule
{

}
