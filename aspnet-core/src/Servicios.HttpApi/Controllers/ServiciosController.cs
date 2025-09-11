using Servicios.Localization;
using Volo.Abp.AspNetCore.Mvc;

namespace Servicios.Controllers;

/* Inherit your controllers from this class.
 */
public abstract class ServiciosController : AbpControllerBase
{
    protected ServiciosController()
    {
        LocalizationResource = typeof(ServiciosResource);
    }
}
