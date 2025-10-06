import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HamburguesasService } from '@proxy/application/hamburguesa';
import { CartService } from '../services/cart.service';

interface CartItem {
  id: number;
  nombre: string;
  precio: number;
  cantidad: number;
  options?: {
    base?: string[];
    removed?: string[];
    added?: string[];
  };
}

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule],
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

    const baseIngredientes = burger.listIngredientes?.map((i: any) => i.nombre) || [];

    if (index > -1) {
      this.cart.cartItems[index].cantidad += burger.cantidad || 1;
    } else {
      this.cart.cartItems.push({
        id: burger.id,
        nombre: burger.nombre,
        precio: burger.precio,
        cantidad: burger.cantidad,
        options: {}
      });
    }

    this.updateTotal();
    burger.cantidad = 0;
  }

  currentPrice(): number {
    if (!this.selected) return 0;
    let base = this.selected.precio || 0;

    if (this.selected.listIngredientes) {
      this.selected.listIngredientes.forEach((ing: any) => {
        if (ing.tipo === 1 && ing.cantidad && ing.precio) {
          base += ing.cantidad * ing.precio;
        }
      });
    }

    return base * this.quantity;
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
      ing.baseCantidad = ing.cantidad ?? 0;
    });
  }

  toggleRemove(nombre:string){
    if(this.removed.has(nombre)){
      this.removed.delete(nombre)
    }else{
      this.removed.add(nombre)
    }
  }

  incExtra(ex: any) {
    ex.cantidad = (ex.cantidad ?? 0) + 1;
  }

  decExtra(ex: any) {
    if (ex.cantidad && ex.cantidad > 0) ex.cantidad--;
  }

  get hasExtras(): boolean {
    return this.selected?.listIngredientes?.some(i => i.tipo === 1) ?? false;
  }

  sumarCant() {
    this.quantity++;
  }

  restarCant() {
    if (this.quantity > 1) this.quantity--;
  }

  closeModal() {
    this.showModal = false;
  }

  addToCart() {
    this.closeModal();
  }

  pedir() { 
    this.openCart(); 
  }

  openCart() 
  { 
    this.showCart = true; 
  }

  cerrarCart() { 
    this.showCart = false; 
  }

  irCheck() { 
    this.cerrarCart();
    this.router.navigate(['/checkout']); 
  }

  get isCheckout() { 
    return this.router.url.startsWith('/checkout'); 
  }
  
  goCheckout() {
    this.Cart.setCarts(this.cart.cartItems);
    this.router.navigate(['/checkout']);
  }

  irHome() { this.router.navigateByUrl('/'); }
  irFavoritos() { this.router.navigateByUrl('/favoritos'); }

  get isCheckout() { return this.router.url.startsWith('/checkout'); }
  get isFavorites() { return this.router.url.startsWith('/favoritos'); }
}
