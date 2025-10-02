import { mapEnumToOptions } from '@abp/ng.core';

export enum TipoIngrediente {
  Fijo = 0,
  Cantidad = 1,
}

export const tipoIngredienteOptions = mapEnumToOptions(TipoIngrediente);
