using System;
using System.Collections;
using System.Collections.Generic;
using Volo.Abp.Domain.Entities;
using Volo.Abp.Domain.Entities.Auditing;


namespace Servicios.Domain.Hamburguesa
{
    public class Pedido : AuditedAggregateRoot<Guid>
    {
        //datos cliente
        public string ClienteNombre { get; set; }
        public string? ClienteEmail { get; set; }
        public string ClienteTelefono { get; set; }
        //datos entrega
        public string Calle { get; set; }
        public string? Piso { get; set; }
        public string? Comentario { get; set; }
        //pago
        public string FormaPago { get; set; }
        public decimal Total { get; set; }
        public PedidoEstado Estado { get; set; } = PedidoEstado.PendientePago;

        public ICollection<PedidoItems> Items { get; set; }

    }
}


