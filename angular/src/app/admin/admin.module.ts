import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Routes } from '@angular/router';
import { VerPedidosComponent } from '../ver-pedidos/ver-pedidos.component';
import { AdminComponent } from './admin.component';


const routes: Routes = [
  { path: '', component: AdminComponent },
  { path: '/verPedidos', component: VerPedidosComponent },

];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule, 
    FormsModule  
  ]
})
export class AdminModule {}