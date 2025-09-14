using System;
using System.Collections;
using System.Collections.Generic;
using Volo.Abp.Domain.Entities;
using Volo.Abp.Domain.Entities.Auditing;


namespace Servicios.Domain.Hamburguesa
{
    public class Secciones : Entity<Guid>
    {
        public string Nombre { get; set; } = null!;

    }
}