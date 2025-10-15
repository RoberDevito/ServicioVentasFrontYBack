import { Injectable } from '@angular/core';

export interface CartItem {
  id: number;
  nombre: string;
  precio: number;
  cantidad: number;
  options?: {
    base?: string[],
    removed?: string[];
    added?: string[];
    selectedCarne?: string | null;
  };
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private storageKey = 'cartItems';
  private cartItems: CartItem[] = [];

  constructor() {
    const saved = localStorage.getItem(this.storageKey);
    this.cartItems = saved ? JSON.parse(saved) : [];
  }

  private saveCart() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.cartItems));
  }

  getCart(): CartItem[] {
    return this.cartItems;
  }

  addItem(item: CartItem) {
    const index = this.cartItems.findIndex(i => i.id === item.id);
    if (index > -1) {
      this.cartItems[index].cantidad += item.cantidad;
    } else {
      this.cartItems.push(item);
    }
    this.saveCart();
  }

  setCarts(items: CartItem[]) {
    this.cartItems = items;
    this.saveCart();
  }

  updateItemCantidad(id: number, cantidad: number) {
    const index = this.cartItems.findIndex(i => i.id === id);
    if (index > -1) {
      this.cartItems[index].cantidad = cantidad;
      if (this.cartItems[index].cantidad <= 0) {
        this.cartItems.splice(index, 1);
      }
      this.saveCart();
    }
  }

  removeItem(id: number) {
    this.cartItems = this.cartItems.filter(i => i.id !== id);
    this.saveCart();
  }

  clearCart() {
    this.cartItems = [];
    localStorage.removeItem(this.storageKey);
  }
}
