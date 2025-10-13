import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HamburguesasService } from '@proxy/application/hamburguesa';
import { CartService } from '../services/cart.service';
import { FormsModule } from '@angular/forms';

interface CartItem {
  id: number;
  nombre: string;
  precio: number;
  cantidad: number;
  comentario?: string;
  options?: {
    base?: string[];
    removed?: string[];
    added?: string[];
    selectedCarne?: string;
  };
}

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  cart = { cartItems: [] as CartItem[] };
  hambur: any[] = [];
  showModal = false;
  showCart = false;
  total = 0;
  selected: any = null;
  added: Set<string> = new Set();
  quantity: number = 0;
  removed: Set<string> = new Set();
  comentario: string = ''; 
  selectedCarne: string 

  constructor(
    private router: Router,
    private hamburguesa: HamburguesasService,
    private Cart: CartService
  ) {}

  ngOnInit(): void {
    this.hamburguesa.getHamburguesa().subscribe(res => {
      this.hambur = res.map((b) => ({ ...b, cantidad: 0 }));
    });
  }

  agregarCarrito(burger: any) {
    if (!burger) return;

    const index = this.cart.cartItems.findIndex(i => i.id === burger.id);
    const baseIngredientes = burger.listIngredientes?.
    map((i: any) => i.nombre) || [];

    if (index > -1) {
      this.cart.cartItems[index].cantidad += burger.cantidad || 1;
    } else {
      this.cart.cartItems.push({
        id: burger.id,
        nombre: burger.nombre,
        precio: burger.precio,
        cantidad: burger.cantidad || 1,
        options: {
          base: baseIngredientes,
          removed: [],
          added: []
        }
      });
    }

    this.updateTotal();
    burger.cantidad = 0;
  }

  currentPrice(): number {
    if (!this.selected) return 0;
    
    let total = this.selected.precio || 0;
    this.selected.listIngredientes?.forEach((ing: any) => {
      if (ing.tipo === 1 && ing.precio && ing.cantidad > (ing.baseCantidad ?? 0)) {
        const diff = ing.cantidad - (ing.baseCantidad ?? 0);
        total += diff * ing.precio;
      }
    });

    if (this.selectedCarne) {
      const carneSeleccionada = this.selected.listIngredientes?.find(
        (ing: any) => ing.nombre === this.selectedCarne && ing.tipo === 2
      );
      if (carneSeleccionada && carneSeleccionada.precio) {
        total += carneSeleccionada.precio;
      }
    }

    return total * this.quantity;
  }

  incrementar(burger: any) {
    burger.cantidad = (burger.cantidad ?? 0) + 1;
  }

  descrementar(burger: any) {
    if (burger.cantidad > 0) burger.cantidad--;
  }

  incCart(i: number) {
    this.cart.cartItems[i].cantidad++;
    this.updateTotal();
  }

  decCart(i: number) {
    if (this.cart.cartItems[i].cantidad > 1) {
      this.cart.cartItems[i].cantidad--;
    } else {
      this.removeCart(i);
    }
    this.updateTotal();
  }

  removeCart(i: number) {
    this.cart.cartItems.splice(i, 1);
    this.updateTotal();
  }

  updateTotal() {
    this.total = this.cart.cartItems.reduce(
      (sum, it) => sum + (it.precio * it.cantidad),
      0
    );
  }

  openModal(burger: any) {
    this.selected = burger;
    this.showModal = true;
    this.quantity = 1;
    this.removed.clear();
    this.added.clear();

    this.selected.listIngredientes?.forEach((ing: any) => {
      if (ing.tipo === 0 && (ing.cantidad == null)) {
        ing.cantidad = 1;
      }

      if (ing.tipo === 1 && (ing.cantidad == null)) {
        ing.cantidad = 0;
      }

      ing.baseCantidad = ing.cantidad;
    });
  }

  incExtra(ex: any) {
    ex.cantidad = (ex.cantidad ?? 0) + 1;
  }

  decExtra(ex: any) {
    if (ex.cantidad && ex.cantidad > 0) ex.cantidad--;
  }

  toggleRemove(nombre: string) {
    if (this.removed.has(nombre)) {
      this.removed.delete(nombre);
    } else {
      this.removed.add(nombre);
    }
  }

  sumarCant() {
    this.quantity++;
  }

  restarCant() {
    if (this.quantity > 1) this.quantity--;
  }

  closeModal() {
    this.showModal = false;
    this.selectedCarne = null;
    this.comentario = '';
    this.removed.clear();
    this.added.clear();
  }

  addToCart() {
    if (!this.selected) return;

    const baseIngredientes: string[] = [];
    const removed: string[] = [];
    const added: string[] = [];
    let extraPrice = 0;

    this.selected.listIngredientes?.forEach((ing: any) => {

      const base = ing.baseCantidad ?? 0;
      const cantidadActual = ing.cantidad ?? 0;

      if (base > 0 && !this.removed.has(ing.nombre)) {
        baseIngredientes.push(ing.nombre); 
      }

      if (base > 0 && this.removed.has(ing.nombre)) {
        removed.push(ing.nombre);
      }

      if (cantidadActual > base) {
        const diff = cantidadActual - base;
        added.push(`${diff}x ${ing.nombre}`);
        extraPrice += diff * (ing.precio || 0);
      }
      
    });

    const basePrice = this.selected.precio || 0;

    let carneExtraPrice = 0;
    if (this.selectedCarne) {
      const carneSeleccionada = this.selected.listIngredientes?.find(
        (ing: any) => ing.nombre === this.selectedCarne && ing.tipo === 2
      );
      if (carneSeleccionada && carneSeleccionada.precio) {
        carneExtraPrice = carneSeleccionada.precio;
      }
    }

    const finalPrice = basePrice + extraPrice + carneExtraPrice;

    const newItem: CartItem = {
      id: this.selected.id,
      nombre: this.selected.nombre,
      comentario: this.comentario.trim(),
      precio: finalPrice,
      cantidad: this.quantity,
      options: { base: baseIngredientes, removed, added, selectedCarne:this.selectedCarne }
    };

    const index = this.cart.cartItems.findIndex(i => 
      i.id === this.selected.id &&
      JSON.stringify(i.options) === JSON.stringify(newItem.options)
    );

    if (index > -1) {
      this.cart.cartItems[index].cantidad += this.quantity;
    } else {
      this.cart.cartItems.push(newItem);
    }

    this.updateTotal();
    this.closeModal();

    // Reset cantidades\
    this.selected.listIngredientes?.forEach(
    (ing: any) => (ing.cantidad = ing.baseCantidad ?? 0)
    );
    this.selected.listIngredientes?.forEach((ing: any) => (ing.cantidad = ing.baseCantidad ?? 0));
    this.comentario = '';
    this.quantity = 1;
    this.removed.clear();
    this.added.clear();
  }

  get quitar() {
    return this.selected?.listIngredientes?.some(i => i.tipo === 0);
  }

  get agregar() {
    return this.selected?.listIngredientes?.some(i => i.tipo === 1);
  }

  get carneAgre(){
    return this.selected?.listIngredientes?.some(i => i.tipo === 2)
  }

  openCart() { this.showCart = true; }
  cerrarCart() { this.showCart = false; }

  goCheckout() {
    this.Cart.setCarts(this.cart.cartItems);
    this.router.navigate(['/checkout']);
  }

  irHome() { this.router.navigateByUrl('/'); }
  irFavoritos() { this.router.navigateByUrl('/favoritos'); }

  get isCheckout() { return this.router.url.startsWith('/checkout'); }
  get isFavorites() { return this.router.url.startsWith('/favoritos'); }
}
