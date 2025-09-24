using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Servicios.Domain.Hamburguesa;
using Volo.Abp;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace Servicios.Pedidos
{
    public class PedidoAppService : ApplicationService
    {
        private readonly IRepository<Pedido, Guid> _pedidoRepository;
        private readonly IRepository<Hamburguesas, Guid> _hamburguesaRepository;

        public PedidoAppService(
            IRepository<Pedido, Guid> pedidoRepository,
            IRepository<Hamburguesas, Guid> hamburguesaRepository)
        {
            _pedidoRepository = pedidoRepository;
            _hamburguesaRepository = hamburguesaRepository;
        }

        // Crear un nuevo pedido
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

        // Obtener un pedido por Id, incluyendo items y nombre de hamburguesa
        public async Task<PedidoDto> GetOneByIdAsync(Guid id)
        {
            var pedido = await _pedidoRepository.FindAsync(
                predicate: p => p.Id == id,
                includeDetails: true
            );

            if (pedido == null)
            {
                throw new UserFriendlyException("Pedido no encontrado");
            }

            var pedidoDto = ObjectMapper.Map<Pedido, PedidoDto>(pedido);

            var hamburguesas = await _hamburguesaRepository.GetListAsync();

            foreach (var itemDto in pedidoDto.Items)
            {
                itemDto.NombreHamburguesa = hamburguesas
                    .FirstOrDefault(h => h.Id == itemDto.HamburguesaId)?.Nombre;
            }

            return pedidoDto;
        }

}
}
