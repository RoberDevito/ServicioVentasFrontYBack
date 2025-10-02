import { Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { VerPedidosComponent } from './ver-pedidos/ver-pedidos.component';

export const appRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./menu/menu.component').then(m => m.MenuComponent),
  },
  {
    path: 'administrador',
    component: AdminComponent
  },
  {
    path: 'verPedidos',
    loadComponent: () => import('./ver-pedidos/ver-pedidos.component').then(m => m.VerPedidosComponent)
  },
  {
    path:'checkout',
    loadComponent: () => import('./checkout/checkout.component').then(m => m.CheckoutComponent)
  }
  // {
  //   path: '',
  //   pathMatch: 'full',
  //   loadChildren: () => import('./home/home.routes').then(m => m.homeRoutes),
  // },
];
