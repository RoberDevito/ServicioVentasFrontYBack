using System;
using System.Collections.Generic;
using System.Text;
using Servicios.Localization;
using Volo.Abp.Application.Services;

namespace Servicios;

/* Inherit your application services from this class.
 */
public abstract class ServiciosAppService : ApplicationService
{
    protected ServiciosAppService()
    {
        LocalizationResource = typeof(ServiciosResource);
    }
}
