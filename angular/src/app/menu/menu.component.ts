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
  hambur:any[] = []
  showModal = false;
  showCart = false;
  total = 0;
  selected: any = null;
  added: Set<string> = new Set();
  quantity:number = 0;
  removed: Set<string> = new Set();

  constructor(
    private router: Router,
    private hamburguesa: HamburguesasService,
    private Cart:CartService
  )
  {}
  
  ngOnInit(): void {

    this.hamburguesa.getHamburguesa().subscribe(res => {
      this.hambur = res.map((b) => ({...b, cantidad:0}));
      console.log('res',res);
    })

  }

  agregarCarrito(burger: any) {
    if (!burger) return;

    const index = this.cart.cartItems.findIndex(i => i.id === burger.id);

    if (index > -1) {
      this.cart.cartItems[index].cantidad += burger.cantidad || 1;
    } else {
      this.cart.cartItems.push({
        id: burger.id,
        nombre: burger.nombre,
        precio: burger.precio,
        cantidad: burger.cantidad || 1,
        options: {
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


  incrementar(burger: any){ 
    if(burger.cantidad == null){
      burger.cantidad = 0
    }else{
      burger.cantidad++
    }
  }

  descrementar(burger:any){
    if(burger.cantidad > 0){
      burger.cantidad--;
    }
  }

  incCart(i:number){
    this.cart.cartItems[i].cantidad++
    this.updateTotal();
  }

  decCart(i:number){
    if(this.cart.cartItems[i].cantidad > 1){
      this.cart.cartItems[i].cantidad--;
    }else{
      this.removeCart(i);
    }
    this.updateTotal();
  }

  removeCart(i:number){
    this.cart.cartItems.splice(i, 1)
    this.updateTotal();
  }

  updateTotal() {
    this.total = this.cart.cartItems.reduce(
      (sum, it) => sum + (it.precio * it.cantidad),
      0
    );
  }

  openModal(burger:any) {
    this.selected = burger;
    this.showModal = true;
    this.quantity = 1;
    this.removed.clear();
    this.added.clear();
  }

  incExtra(ex:any){
    if(ex.cantidad == null){
      ex.cantidad = 0;
    }
    
    ex.cantidad++

  }

  decExtra(ex:any){
    if (ex.cantidad == null) {
      ex.cantidad = 0;
    }
    if(ex.cantidad > 1){
      ex.cantidad--;
    }
  }

  get hasExtras(): boolean {
    return this.selected?.listIngredientes?.some(i => i.tipo === 1) ?? false;
  }  

  sumarCant(){
    this.quantity ++;
  }

  restarCant(){
    if(this.quantity > 1){
      this.quantity--;
    }
  }

  closeModal() { 
    this.showModal = false; 
  }

 addToCart() {
  if (!this.selected) return;

  const basePrice = this.selected.precio || 0;

  // 🔹 Calcular extras y removidos
  const removed: string[] = [];
  const added: string[] = [];
  let extraPrice = 0;

  this.selected.listIngredientes?.forEach((ing: any) => {
    if (ing.tipo === 0 && this.removed.has(ing.nombre)) {
      removed.push(ing.nombre);
    }

    if (ing.tipo === 1 && ing.cantidad && ing.cantidad > 0) {
      added.push(`${ing.cantidad}x ${ing.nombre}`);
      extraPrice += ing.cantidad * (ing.precio || 0);
    }
  });

  const finalPrice = basePrice + extraPrice;

  // 🔹 Crear el ítem del carrito con personalización
  const newItem: CartItem = {
    id: this.selected.id,
    nombre: this.selected.nombre,
    precio: finalPrice,
    cantidad: this.quantity,
    options: { removed, added }
  };

  // 🔹 Si ya existe en el carrito, lo combinamos
  const index = this.cart.cartItems.findIndex(
    i => i.id === this.selected.id &&
    JSON.stringify(i.options) === JSON.stringify(newItem.options)
  );

  if (index > -1) {
    this.cart.cartItems[index].cantidad += this.quantity;
  } else {
    this.cart.cartItems.push(newItem);
  }

  // 🔹 Actualizar total
  this.updateTotal();

  // 🔹 Resetear modal
  this.closeModal();
  this.selected.listIngredientes?.forEach((ing: any) => (ing.cantidad = 0));
  this.quantity = 1;
  this.removed.clear();
  this.added.clear();
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

  irHome() { 
    this.router.navigateByUrl('/'); 
  }
  
  irFavoritos() {
    this.router.navigateByUrl('/favoritos'); 
  }
  
  get isFavorites() { 
    return this.router.url.startsWith('/favoritos'); 
  }

}
