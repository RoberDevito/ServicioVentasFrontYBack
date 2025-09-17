import { Injectable } from '@angular/core';

export interface CartItem {
  id: number;
  nombre: string;
  precio: number;
  cantidad: number;
  options?: {
    removed?: string[];
    added?: string[];
  };
}

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartItems: CartItem[] = [];

  setCarts(items: CartItem[]){
    this.cartItems = items;
  }

  getCart():CartItem[] {
    return this.cartItems;
  }

  clearCart(){
    this.cartItems = [];
  }
  
}
