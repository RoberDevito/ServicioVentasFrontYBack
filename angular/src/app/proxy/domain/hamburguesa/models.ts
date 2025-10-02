import type { EntityDto } from '@abp/ng.core';
import type { TipoIngrediente } from './tipo-ingrediente.enum';

export interface HamburguesasDTO {
  nombre?: string;
  precio: number;
  imagenUrl?: string;
  listIngredientes: IngredientesDTO[];
  fechaCreacion?: string;
  fechaModificacion?: string;
}

export interface HamburguesasDTOGet extends EntityDto<string> {
  nombre?: string;
  precio: number;
  imagenUrl?: string;
  listIngredientes: IngredientesDTO[];
  fechaCreacion?: string;
  fechaModificacion?: string;
}

export interface IngredientesDTO extends EntityDto<string> {
  nombre?: string;
  cantidad?: number;
  precio?: number;
  tipo?: TipoIngrediente;
}
