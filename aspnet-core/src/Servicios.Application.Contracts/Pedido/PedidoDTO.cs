using System;
using System.Collections.Generic;
using Servicios.Domain.Hamburguesa;
using Volo.Abp.Application.Dtos;

namespace Servicios.Pedidos
{
    public class CrearPedidoDto
    {
        // Datos cliente
        public string ClienteNombre { get; set; }
        public string? ClienteEmail { get; set; }
        public string ClienteTelefono { get; set; }

        // Entrega
        public string Calle { get; set; }
        public string? Piso { get; set; }
        public string? Comentario { get; set; }

        // Pago
        public string FormaPago { get; set; }

        public List<CrearPedidoItemDto> Items { get; set; }
    }

    public class CrearPedidoItemDto
    {
        public Guid HamburguesaId { get; set; }
        public int Cantidad { get; set; }
        public decimal PrecioUnitario { get; set; }
        public string? IngredientesQuitados { get; set; }
        public string? IngredientesAgregados { get; set; }
        public string? CarneSeleccionada { get; set; }
    }

    public class PedidoDto : EntityDto<Guid>
    {
        public string ClienteNombre { get; set; }
        public string? ClienteEmail { get; set; }
        public string ClienteTelefono { get; set; }
        public string Calle { get; set; }
        public string? Piso { get; set; }
        public string? Comentario { get; set; }
        public string FormaPago { get; set; }
        public decimal Total { get; set; }
        public PedidoEstado Estado { get; set; }
        public List<PedidoItemDto> Items { get; set; }
    }

    public class PedidoItemDto
    {
        public Guid HamburguesaId { get; set; }
        public string? NombreHamburguesa { get; set; } 
        public int Cantidad { get; set; }
        public decimal PrecioUnitario { get; set; }

        public string? IngredientesQuitados { get; set; }
        public string? IngredientesAgregados { get; set; }
        public string? CarneSeleccionada { get; set; }
    }
}
