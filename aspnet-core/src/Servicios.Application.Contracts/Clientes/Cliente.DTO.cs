using System;
using System.Collections;
using System.Collections.Generic;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Domain.Entities;


namespace Servicios.Domain.Hamburguesa
{
    public class ClienteDTO : EntityDto<Guid>
    {
        public string Nombre { get; set; } = null!;
        public string Apellido { get; set; } = null!;
        public string Direccion { get; set; } = null!;
        public int Telefono { get; set; } = 0!;
        public string Email { get; set; } = null!;
    }

}