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
        public int Cantidad { get; set; } = 0;
        public Guid HamburguesaId { get; set; }
        public Hamburguesas Hamburguesa { get; set; }
    }

}