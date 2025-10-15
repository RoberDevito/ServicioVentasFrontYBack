using System.Threading.Tasks;

namespace Servicios.Pedidos
{
    public interface IPedidoNotifier
    {
        Task NotificarNuevoPedidoAsync(PedidoDto pedido);
    }
}
    