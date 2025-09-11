using System;
using System.Collections;
using System.Collections.Generic;
using Volo.Abp.Domain.Entities;


namespace Servicios.Domain.Hamburguesa
{
    public class HamburguesasDTO
    {
        public string Nombre { get; set; }
        public string Descripcion { get; set; }
        public decimal Precio { get; set; }
        public string ImagenUrl { get; set; }
        public DateTime FechaCreacion { get; set; }
        public DateTime? FechaModificacion { get; set; } 
    }
}


