import type { EntityDto } from '@abp/ng.core';

export interface HamburguesasDTO {
  nombre?: string;
  descripcion?: string;
  precio: number;
  imagenUrl?: string;
  fechaCreacion?: string;
  fechaModificacion?: string;
}

export interface HamburguesasDTOGet extends EntityDto<string> {
  nombre?: string;
  descripcion?: string;
  precio: number;
  imagenUrl?: string;
  fechaCreacion?: string;
  fechaModificacion?: string;
}
