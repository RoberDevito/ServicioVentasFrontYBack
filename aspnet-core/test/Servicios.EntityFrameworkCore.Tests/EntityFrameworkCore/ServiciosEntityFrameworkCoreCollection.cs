using Xunit;

namespace Servicios.EntityFrameworkCore;

[CollectionDefinition(ServiciosTestConsts.CollectionDefinitionName)]
public class ServiciosEntityFrameworkCoreCollection : ICollectionFixture<ServiciosEntityFrameworkCoreFixture>
{

}
