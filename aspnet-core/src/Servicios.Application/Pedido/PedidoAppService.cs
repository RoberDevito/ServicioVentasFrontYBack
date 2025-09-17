using System;
using System.Linq;
using System.Threading.Tasks;
using Servicios.Domain.Hamburguesa;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace Servicios.Pedidos
{
    public class PedidoAppService : ApplicationService
    {
        private readonly IRepository<Pedido, Guid> _pedidoRepository;

        public PedidoAppService(IRepository<Pedido, Guid> pedidoRepository)
        {
            _pedidoRepository = pedidoRepository;
        }

        public async Task<PedidoDto> CrearAsync(CrearPedidoDto input)
        {
            var pedido = new Pedido
            {
                ClienteNombre = input.ClienteNombre,
                ClienteEmail = input.ClienteEmail,
                ClienteTelefono = input.ClienteTelefono,
                Calle = input.Calle,
                Piso = input.Piso,
                Comentario = input.Comentario,
                FormaPago = input.FormaPago,
                Estado = PedidoEstado.PendientePago, 

                Items = input.Items.Select(i => new PedidoItems
                {
                    HamburguesaId = i.HamburguesaId,
                    Cantidad = i.Cantidad,
                    PrecioUnitario = i.PrecioUnitario
                }).ToList()
            };

            pedido.Total = pedido.Items.Sum(x => x.PrecioUnitario * x.Cantidad);

            await _pedidoRepository.InsertAsync(pedido);

            return ObjectMapper.Map<Pedido, PedidoDto>(pedido);
        }

    }
    
}
