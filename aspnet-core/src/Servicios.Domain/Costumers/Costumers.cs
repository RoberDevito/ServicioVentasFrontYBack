using System;
using System.Collections;
using System.Collections.Generic;
using Volo.Abp.Domain.Entities;
using Volo.Abp.Domain.Entities.Auditing;


namespace Servicios.Domain.Hamburguesa
{
    public class Costumers : Entity<Guid>
    {
        public string Name { get; set; } = null!;

        public string Lastname { get; set; } = null!;

        public string Address { get; set; } = null!;

        public int Phone { get; set; } = 0!;

        public string Email { get; set; } = null!;

        public string Password { get; set; } = null!;
        public DateTime Creation { get; set; } = DateTime.Now;

    }
}