using System;
using System.Collections;
using System.Collections.Generic;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Domain.Entities;



namespace Servicios.Domain.Hamburguesa
{   
    public class IngredientesDTO : EntityDto<Guid>
    {
        public string Nombre { get; set; }
        public int? Cantidad { get; set; }
     }
}