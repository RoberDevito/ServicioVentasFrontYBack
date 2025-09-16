import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HamburguesasService } from '@proxy/application/hamburguesa';

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

  constructor(
    private router: Router,
    private hamburguesa: HamburguesasService
  )
  {}
  
  ngOnInit(): void {

    this.hamburguesa.getHamburguesa().subscribe(res => {
      this.hambur = res.map((b) => ({...b, cantidad:0}));
      console.log('res',res);
    })

  }

  agregarCarrito(burger: any) {
    const index = this.cart.cartItems.findIndex(i => i.id === burger.id);

    if (index > -1) {
      this.cart.cartItems[index].cantidad += burger.cantidad;
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

  openModal() {
    this.showModal = true;
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

  get isFavorites() { 
    return this.router.url.startsWith('/favoritos'); 
  }

  irHome() { 
    this.router.navigateByUrl('/'); 
  }

  irFavoritos() {
    this.router.navigateByUrl('/favoritos'); 
  }


}
