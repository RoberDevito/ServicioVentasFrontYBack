using Servicios.EntityFrameworkCore;
using Volo.Abp.Autofac;
using Volo.Abp.Modularity;

namespace Servicios.DbMigrator;

[DependsOn(
    typeof(AbpAutofacModule),
    typeof(ServiciosEntityFrameworkCoreModule),
    typeof(ServiciosApplicationContractsModule)
    )]
public class ServiciosDbMigratorModule : AbpModule
{
}
