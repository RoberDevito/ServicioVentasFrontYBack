import type { EntityDto } from '@abp/ng.core';
import type { PedidoEstado } from '../domain/hamburguesa/pedido-estado.enum';

export interface CrearPedidoDto {
  clienteNombre?: string;
  clienteEmail?: string;
  clienteTelefono?: string;
  calle?: string;
  piso?: string;
  comentario?: string;
  formaPago?: string;
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
