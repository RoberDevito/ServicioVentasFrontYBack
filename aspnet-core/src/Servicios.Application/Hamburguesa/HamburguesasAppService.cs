using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Volo.Abp;
using Volo.Abp.Domain.Entities;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Application.Services;
using Servicios.Domain.Hamburguesa;
using System.Security.Cryptography.X509Certificates;

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
            var ver = await _hamburguesasRepository.AnyAsync(x => x.Nombre == input.Nombre);

            if (ver)
            {
                throw new UserFriendlyException("Ese nombre de hamburguesa existe");
            }

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

        public async Task<List<HamburguesasDTOGet>> GetHamburguesaAsync()
        {
            var hamburguesas = await _hamburguesasRepository.GetListAsync();
            
            return hamburguesas
            .Select(x => new HamburguesasDTOGet
            {
                Id = x.Id,
                Nombre = x.Nombre,
                Descripcion = x.Descripcion,
                Precio = x.Precio,
                ImagenUrl = x.ImagenUrl,
                FechaCreacion = x.FechaCreacion
            })
            .ToList();
        }

    }
}
