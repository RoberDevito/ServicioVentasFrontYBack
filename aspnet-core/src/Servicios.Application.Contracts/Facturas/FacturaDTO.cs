using System;
using System.Collections;
using System.Collections.Generic;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Domain.Entities;


namespace Servicios.Domain.Hamburguesa
{
    public class FacturaDTO
    {
        public double PrecioTotalProductos { get; set; } = 0!;
        public double PrecioEnvio { get; set; } = 0!;
        public double PrecioServicios { get; set; } = 0!;
        public double? Propina { get; set; } = 0!;
        public double? Descuento { get; set; } = 0!;
        public double Total { get; set; } = 0!;
    }

}