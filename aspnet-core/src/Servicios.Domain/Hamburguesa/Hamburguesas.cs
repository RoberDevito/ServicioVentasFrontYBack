using System;
using System.Collections;
using System.Collections.Generic;
using Volo.Abp.Domain.Entities;
using Volo.Abp.Domain.Entities.Auditing;


namespace Servicios.Domain.Hamburguesa
{
    public class Hamburguesas : Entity<Guid>
    {
        public string Nombre { get; set; }
        public decimal Precio { get; set; }
        public string ImagenUrl { get; set; }
        public List<Ingrendientes> ListaIngredientes { get; set; }
        public int Seccion { get; set; } = 0!;
        public DateTime FechaCreacion { get; set; }
        public DateTime? FechaModificacion { get; set; }
    }

}


