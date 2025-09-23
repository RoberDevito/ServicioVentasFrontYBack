using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
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

        public async Task<List<PedidoDto>> GetListAsync()
        {
            var queryable = await _pedidoRepository.GetQueryableAsync();

            var pedidos = await AsyncExecuter.ToListAsync(
                queryable
                    .Include(x => x.Items)
                    .ThenInclude(i => i.Hamburguesa)
            );

            return pedidos
                .Select(pedido => new PedidoDto
                {
                    Id = pedido.Id,
                    ClienteNombre = pedido.ClienteNombre,
                    ClienteEmail = pedido.ClienteEmail,
                    ClienteTelefono = pedido.ClienteTelefono,
                    Calle = pedido.Calle,
                    Piso = pedido.Piso,
                    Comentario = pedido.Comentario,
                    FormaPago = pedido.FormaPago,
                    Total = pedido.Total,
                    Estado = pedido.Estado,
                    Items = pedido.Items?
                        .Select(item => new PedidoItemDto
                        {
                            HamburguesaId = item.HamburguesaId,
                            NombreHamburguesa = item.Hamburguesa?.Nombre,
                            Cantidad = item.Cantidad,
                            PrecioUnitario = item.PrecioUnitario
                        })
                        .ToList() ?? new List<PedidoItemDto>()
                })
                .ToList();
        }
    }
}
