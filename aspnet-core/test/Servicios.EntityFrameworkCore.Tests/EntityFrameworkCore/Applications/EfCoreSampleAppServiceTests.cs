using Servicios.Samples;
using Xunit;

namespace Servicios.EntityFrameworkCore.Applications;

[Collection(ServiciosTestConsts.CollectionDefinitionName)]
public class EfCoreSampleAppServiceTests : SampleAppServiceTests<ServiciosEntityFrameworkCoreTestModule>
{

}
