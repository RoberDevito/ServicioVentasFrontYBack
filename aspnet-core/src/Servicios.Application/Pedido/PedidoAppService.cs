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
        private readonly IPedidoNotifier _pedidoNotifier;

        public PedidoAppService(
            IRepository<Pedido, Guid> pedidoRepository,
            IRepository<Hamburguesas, Guid> hamburguesaRepository,
            IPedidoNotifier pedidoNotifier)
        {
            _pedidoRepository = pedidoRepository;
            _hamburguesaRepository = hamburguesaRepository;
            _pedidoNotifier = pedidoNotifier;   
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
                    PrecioUnitario = i.PrecioUnitario,
                    IngredientesQuitados = i.IngredientesQuitados,
                    IngredientesAgregados = i.IngredientesAgregados,
                    CarneSeleccionada = i.CarneSeleccionada
                }).ToList()
            };

            pedido.Total = pedido.Items.Sum(x => x.PrecioUnitario * x.Cantidad);

            await _pedidoRepository.InsertAsync(pedido);

            var pedidoDto = ObjectMapper.Map<Pedido, PedidoDto>(pedido);

            await _pedidoNotifier.NotificarNuevoPedidoAsync(pedidoDto);

            return pedidoDto;
        }

        // Obtener un pedido por Id, incluyendo items y nombre de hamburguesa
      public async Task<List<PedidoDto>> GetAllAsync()
        {
            var queryable = await _pedidoRepository.GetQueryableAsync();

            var pedidos = await queryable
                .Include(p => p.Items)
                .ThenInclude(i => i.Hamburguesa)
                .ToListAsync();

            return pedidos.Select(p => new PedidoDto
            {
                Id = p.Id,
                ClienteNombre = p.ClienteNombre,
                ClienteEmail = p.ClienteEmail,
                ClienteTelefono = p.ClienteTelefono,
                Calle = p.Calle,
                Piso = p.Piso,
                Comentario = p.Comentario,
                FormaPago = p.FormaPago,
                Total = p.Total,
                Estado = p.Estado,
                Items = p.Items.Select(i => new PedidoItemDto
                {
                    HamburguesaId = i.HamburguesaId,
                    NombreHamburguesa = i.Hamburguesa?.Nombre,
                    Cantidad = i.Cantidad,
                    PrecioUnitario = i.PrecioUnitario,
                    IngredientesQuitados = i.IngredientesQuitados,
                    IngredientesAgregados = i.IngredientesAgregados,
                    CarneSeleccionada = i.CarneSeleccionada
                }).ToList()
            }).ToList();
        }

    }
}
