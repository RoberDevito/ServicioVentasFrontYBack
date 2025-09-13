import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HamburguesasDTO } from '@proxy/domain/hamburguesa';
import { HamburguesasService } from '@proxy/application/hamburguesa';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {

  constructor(
    private fb: FormBuilder,
    private hamburguesa:HamburguesasService
  ) {}

  form = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    precio: [null as number | null, [Validators.required, Validators.min(0)]],
    descripcion: ['', [Validators.maxLength(300)]],
    imagenUrl: ['', [Validators.pattern(/^(https?:\/\/).+/)]]
  });

  get f() { 
    return this.form.controls; 
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const hamburDTO:HamburguesasDTO = {
      nombre: this.form.value.nombre,
      precio: this.form.value.precio,
      descripcion: this.form.value.descripcion,
      imagenUrl: this.form.value.imagenUrl
    }

    this.hamburguesa.create(hamburDTO).subscribe({
      next: () => {
        console.log(hamburDTO)
      }
    })

  }

}
