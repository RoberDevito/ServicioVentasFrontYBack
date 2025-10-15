import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OrderSignalRService {
  
  private hubConnection!: signalR.HubConnection;
  private pedidoSubject = new BehaviorSubject<any | null>(null);
  pedido$ = this.pedidoSubject.asObservable();

  startConnection(): void {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:44327/hubs/orders')
      .withAutomaticReconnect()
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('✅ Conectado al hub de pedidos'))
      .catch(err => console.error('❌ Error de conexión:', err));

    this.hubConnection.on('NuevoPedido', (pedido) => {
      console.log('🆕 Nuevo pedido recibido:', pedido);
      this.pedidoSubject.next(pedido);
    });
  }
}
