import type { EntityDto } from '@abp/ng.core';

export interface CrearPedidoDto {
  clienteNombre?: string;
  clienteEmail?: string;
  clienteTelefono?: string;
  calle?: string;
  piso?: string;
  comentario?: string;
  formaPago?: string;
  total: number;
  items: CrearPedidoItemDto[];
}

export interface CrearPedidoItemDto {
  hamburguesaId?: string;
  cantidad: number;
  precioUnitario: number;
}

export interface PedidoDto extends EntityDto<string> {
  clienteNombre?: string;
  clienteEmail?: string;
  clienteTelefono?: string;
  calle?: string;
  piso?: string;
  comentario?: string;
  formaPago?: string;
  total: number;
  estado?: PedidoEstado;
  items: PedidoItemDto[];
}

export interface PedidoItemDto {
  hamburguesaId?: string;
  nombreHamburguesa?: string;
  cantidad: number;
  precioUnitario: number;
}
