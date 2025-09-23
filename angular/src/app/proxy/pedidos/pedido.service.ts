import type { CrearPedidoDto, PedidoDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PedidoService {
  apiName = 'Default';
  

  crear = (input: CrearPedidoDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PedidoDto>({
      method: 'POST',
      url: '/api/app/pedido/crear',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  getList = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, PedidoDto[]>({
      method: 'GET',
      url: '/api/app/pedido',
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
