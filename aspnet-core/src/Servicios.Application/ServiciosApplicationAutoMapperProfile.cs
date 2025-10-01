using AutoMapper;
using Servicios.Domain.Hamburguesa;
using Servicios.Pedidos;

namespace Servicios;

public class ServiciosApplicationAutoMapperProfile : Profile
{
    public ServiciosApplicationAutoMapperProfile()
    {
         // Entidad → DTO
            CreateMap<Pedido, PedidoDto>();
            CreateMap<PedidoItems, PedidoItemDto>()
                .ForMember(dest => dest.NombreHamburguesa, opt => opt.MapFrom(src => src.Hamburguesa != null ? src.Hamburguesa.Nombre : null));

            // DTO → Entidad
            CreateMap<CrearPedidoDto, Pedido>();
            CreateMap<CrearPedidoItemDto, PedidoItems>();
    }
}
