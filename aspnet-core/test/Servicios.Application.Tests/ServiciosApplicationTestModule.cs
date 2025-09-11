using Volo.Abp.Modularity;

namespace Servicios;

[DependsOn(
    typeof(ServiciosApplicationModule),
    typeof(ServiciosDomainTestModule)
)]
public class ServiciosApplicationTestModule : AbpModule
{

}
