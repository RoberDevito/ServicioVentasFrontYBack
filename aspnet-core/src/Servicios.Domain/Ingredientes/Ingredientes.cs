using System;
using System.Collections;
using System.Collections.Generic;
using Volo.Abp.Domain.Entities;
using Volo.Abp.Domain.Entities.Auditing;


namespace Servicios.Domain.Hamburguesa
{
    public class Ingrediente : Entity<Guid>
    {
        public string Nombre { get; set; } = null!;
<<<<<<< HEAD
        public double Precio { get; set; } = 0!;
        public int? Cantidad { get; set; } = 0;
=======
        public double? Precio { get; set; }     
        public int? Cantidad { get; set; } 
        public TipoIngrediente  Tipo { get; set; } 
>>>>>>> 2cb8adcf4b3ab02243f03bb7260ecef6be2a7a5a
        public Guid HamburguesaId { get; set; }
        public Hamburguesas Hamburguesa { get; set; }
    }

}