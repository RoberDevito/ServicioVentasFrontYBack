using System;
using System.Collections;
using System.Collections.Generic;
using Volo.Abp.Domain.Entities;
using Volo.Abp.Domain.Entities.Auditing;


namespace Servicios.Domain.Hamburguesa
{
    public class Costumers : Entity<Guid>
    {
        public string Nombre { get; set; } = null!;

        public string Apellido { get; set; } = null!;

        public string Direccion { get; set; } = null!;

        public int Telefono { get; set; } = 0!;

        public string Email { get; set; } = null!;

        public string Contraseña { get; set; } = null!;
        public DateTime FechaCreaciopn { get; set; } = DateTime.Now;

    }
}