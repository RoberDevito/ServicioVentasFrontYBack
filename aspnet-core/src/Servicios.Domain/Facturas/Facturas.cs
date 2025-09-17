using System;
using System.Collections;
using System.Collections.Generic;
using Volo.Abp.Domain.Entities;
using Volo.Abp.Domain.Entities.Auditing;


namespace Servicios.Domain.Hamburguesa
{
    public class Facturas : Entity<Guid>
    {
        public double PrecioTotalProductos { get; set; } = 0!;
        public double PrecioEnvio { get; set; } = 0!;
        public double PrecioServicios { get; set; } = 0!;
        public double? Propina { get; set; } = 0!;
        public double? Descuento { get; set; } = 0!;
        public double Total { get; set; } = 0!;
        public DateTime Fecha { get; set; }

    }
}