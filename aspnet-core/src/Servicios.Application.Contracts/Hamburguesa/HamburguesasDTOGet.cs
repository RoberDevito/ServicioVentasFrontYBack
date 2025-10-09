using System;
using System.Collections;
using System.Collections.Generic;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Domain.Entities;


namespace Servicios.Domain.Hamburguesa
{
    public class HamburguesasDTOGet : EntityDto<Guid>
    {
        public string Nombre { get; set; }
        public decimal? Precio { get; set; }
        public string Descripcion { get; set; }
        public string ImagenUrl { get; set; }
        public List<IngredientesDTO> ListIngredientes { get; set; }
        public DateTime FechaCreacion { get; set; }
        public DateTime? FechaModificacion { get; set; }
    }
    
}


