import { Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';

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
    path:'checkout',
    loadComponent: () => import('./checkout/checkout.component').then(m => m.CheckoutComponent)
  }
  // {
  //   path: '',
  //   pathMatch: 'full',
  //   loadChildren: () => import('./home/home.routes').then(m => m.homeRoutes),
  // },
];
