using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Volo.Abp;
using Volo.Abp.Domain.Entities;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Application.Services;
using Servicios.Domain.Hamburguesa;

namespace Servicios.Application.Hamburguesa
{
    public class HamburguesasAppService : ApplicationService
    {
        private readonly IRepository<Hamburguesas, Guid> _hamburguesasRepository;

        public HamburguesasAppService(IRepository<Hamburguesas, Guid> hamburguesasRepository)
        {
            _hamburguesasRepository = hamburguesasRepository;
        }

        public async Task CreateAsync(HamburguesasDTO input)
        {
            var hamburguesa = new Hamburguesas
            {
                Nombre = input.Nombre,
                Descripcion = input.Descripcion,
                Precio = input.Precio,
                ImagenUrl = input.ImagenUrl,
                FechaCreacion = DateTime.UtcNow
            };

            await _hamburguesasRepository.InsertAsync(hamburguesa);
        }
    }
}
