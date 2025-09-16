import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], 
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'] 
})
export class CheckoutComponent {

  submitted = false;

  constructor(private fb: FormBuilder) {}

  data = this.fb.group({
    nombre: ['', Validators.required],
    telefono: ['', Validators.required],
    correo: ['', [Validators.required, Validators.email]],
    direccion: this.fb.group({
      calle: ['', Validators.required],
      piso: [''],
    }),
    notas: [''],
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
        montoCtrl.clearValidators(); // 👈 mejor que pasar null
        montoCtrl.setValue('');
      }
      montoCtrl.updateValueAndValidity({ emitEvent: false });
    });
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
