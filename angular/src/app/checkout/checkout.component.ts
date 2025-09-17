import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CartItem, CartService } from '../services/cart.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], 
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'] 
})
export class CheckoutComponent {

  cart: CartItem[] = [];
  submitted = false;
  total = 0;

  constructor(
    private fb: FormBuilder,
    private cartService: CartService
  ) {}

  data = this.fb.group({
    nombre: ['', Validators.required],
    telefono: ['', Validators.required],
    correo: ['', [Validators.required, Validators.email]],
    direccion: this.fb.group({
      calle: ['', Validators.required],
      piso: [''],
      notas: [''],
    }),
    formaPago: ['', Validators.required],
    montoEfectivo: [''] 
  });

  ngOnInit(): void {
    const formaPagoCtrl = this.data.get('formaPago');
    const montoCtrl = this.data.get('montoEfectivo');
    
    formaPagoCtrl?.valueChanges.subscribe(v => {
      if (!montoCtrl) return;
      
      if (v === 'Efectivo') {
        montoCtrl.setValidators([Validators.required]);
      } else {
        montoCtrl.clearValidators(); 
        montoCtrl.setValue('');
      }
      montoCtrl.updateValueAndValidity({ emitEvent: false });
    });
    
    this.cart = this.cartService.getCart();
    this.updateTotal();
    
  }
  
  updateTotal() {
    this.total = this.cart.reduce((sum, it) => sum + (it.precio * it.cantidad), 0);
  }

  pagar() {
    this.submitted = true;

    if (this.data.valid) {
      console.log('✅ Formulario válido');
      console.log('Datos del cliente:', this.data.value);
      alert(`Pago simulado por $${this.data.value.montoEfectivo ?? 0}`);
    } else {
      console.warn('⚠️ Complete los campos faltantes');
      this.data.markAllAsTouched();

      try {
        const firstInvalid: HTMLElement | null =
          document.querySelector('[formcontrolname].ng-invalid, .input-underline.ng-invalid');
        if (firstInvalid) {
          firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
          firstInvalid.focus?.();
        }
      } catch{}
    }
  }
}
