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
  }
  // {
  //   path: '',
  //   pathMatch: 'full',
  //   loadChildren: () => import('./home/home.routes').then(m => m.homeRoutes),
  // },
];
