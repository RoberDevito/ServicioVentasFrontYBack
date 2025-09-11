using Servicios.Samples;
using Xunit;

namespace Servicios.EntityFrameworkCore.Domains;

[Collection(ServiciosTestConsts.CollectionDefinitionName)]
public class EfCoreSampleDomainTests : SampleDomainTests<ServiciosEntityFrameworkCoreTestModule>
{

}
