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
            CreateMap<PedidoItems, PedidoItemDto>();

            // DTO → Entidad
            CreateMap<CrearPedidoDto, Pedido>();
            CreateMap<CrearPedidoItemDto, PedidoItems>();
    }
}
