using System;
using System.Collections;
using System.Collections.Generic;
using Volo.Abp.Domain.Entities;
using Volo.Abp.Domain.Entities.Auditing;


namespace Servicios.Domain.Hamburguesa
{
    public class PedidoItems : AuditedAggregateRoot<Guid>
    {
        public Guid PedidoId { get; set; }
        public Pedido Pedido { get; set; }
        public Guid HamburguesaId { get; set; }
        public Hamburguesas Hamburguesa { get; set; }
        public int Cantidad { get; set; }
        public decimal PrecioUnitario{ get; set; }

    }
}


