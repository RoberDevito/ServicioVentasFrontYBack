using Volo.Abp.Settings;

namespace Servicios.Settings;

public class ServiciosSettingDefinitionProvider : SettingDefinitionProvider
{
    public override void Define(ISettingDefinitionContext context)
    {
        //Define your own settings here. Example:
        //context.Add(new SettingDefinition(ServiciosSettings.MySetting1));
    }
}
