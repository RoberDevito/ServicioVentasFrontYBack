using Microsoft.Extensions.Localization;
using Servicios.Localization;
using Volo.Abp.DependencyInjection;
using Volo.Abp.Ui.Branding;

namespace Servicios;

[Dependency(ReplaceServices = true)]
public class ServiciosBrandingProvider : DefaultBrandingProvider
{
    private IStringLocalizer<ServiciosResource> _localizer;

    public ServiciosBrandingProvider(IStringLocalizer<ServiciosResource> localizer)
    {
        _localizer = localizer;
    }

    public override string AppName => _localizer["AppName"];
}
