import { mapEnumToOptions } from '@abp/ng.core';

export enum PedidoEstado {
  PendientePago = 0,
  Pagado = 1,
  Cancelado = 2,
}

export const pedidoEstadoOptions = mapEnumToOptions(PedidoEstado);
