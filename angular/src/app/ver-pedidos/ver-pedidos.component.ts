import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PedidoService, PedidoDto } from '@proxy/pedidos';
import { OrderSignalRService } from '../services/order-signalr.service';

@Component({
  selector: 'app-ver-pedidos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ver-pedidos.component.html',
  styleUrls: ['./ver-pedidos.component.scss']
})
export class VerPedidosComponent implements OnInit {
  pedidos: PedidoDto[] = [];
  loading = true;
  error = '';

  constructor(
    private pedidoService: PedidoService,
    private orderHub: OrderSignalRService
  ) {}

  ngOnInit(): void {
    this.orderHub.startConnection();
    this.pedidoService.getAll().subscribe({
      next: (res) => {
        console.log('Pedido obtenido:', res);
        this.pedidos = res || [];
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'No se pudieron cargar los pedidos.';
        this.loading = false;
      }
    });
    this.orderHub.pedido$.subscribe((nuevoPedido) => {
      if (nuevoPedido) {
        console.log('Actualizando lista con nuevo pedido:', nuevoPedido);
        this.pedidos.unshift(nuevoPedido);
      }
    });

  }
}
