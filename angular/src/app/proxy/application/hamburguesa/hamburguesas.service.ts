import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { HamburguesasDTO, HamburguesasDTOGet } from '../../domain/hamburguesa/models';

@Injectable({
  providedIn: 'root',
})
export class HamburguesasService {
  apiName = 'Default';
  

  create = (input: HamburguesasDTO, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: '/api/app/hamburguesas',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  getHamburguesa = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, HamburguesasDTOGet[]>({
      method: 'GET',
      url: '/api/app/hamburguesas/hamburguesa',
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
