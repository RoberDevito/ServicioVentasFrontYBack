import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HamburguesasDTO } from '@proxy/domain/hamburguesa';
import { HamburguesasService } from '@proxy/application/hamburguesa';
import { Router } from '@angular/router';
import { BaseCoreModule } from "@abp/ng.core";


@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, BaseCoreModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {

  menuOpen = false;
  showSuccessModal = false;
  showErrorModal = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private hamburguesa: HamburguesasService,
    private router: Router
  ) {}

  form = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    precio: [null as number | null, [Validators.required, Validators.min(0)]],
    descripcion: ['', [Validators.maxLength(300)]],
    imagenUrl: ['', [Validators.pattern(/^(https?:\/\/).+/)]],
    listIngredientes: this.fb.array([this.createIngredienteGroup()])
  });

  get f() {
    return this.form.controls;
  }

  get ingredientes(): FormArray {
    return this.form.get('listIngredientes') as FormArray;
  }

  addIngrediente(): void {
    this.ingredientes.push(this.createIngredienteGroup());
  }

  removeIngrediente(index: number): void {
    if (this.ingredientes.length === 1) {
      this.ingredientes.at(0).reset({
        nombre: '',
        cantidad: 0,
        precio: 0,
        tipo: 'Fijo'
      });
      return;
    }
    this.ingredientes.removeAt(index);
  }

  hasIngredientes(): boolean {
    return this.ingredientes.controls.some(control => {
      const value = control.value as { nombre?: string | null };
      return typeof value.nombre === 'string' && value.nombre.trim().length > 0;
    });
  }

  get ingredientesPreview(): Array<{ nombre?: string; cantidad?: number; precio?: number; tipo?: string }> {
    return this.ingredientes.controls.map(control => control.value as { nombre?: string; cantidad?: number; precio?: number; tipo?: string });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formValue = this.form.getRawValue();
    if (formValue.precio === null) {
      return;
    }

    const ingredientes = (formValue.listIngredientes ?? [])
      .filter((ingrediente: any) => ingrediente?.nombre)
      .map((ingrediente: any) => ({
        nombre: ingrediente.nombre,
        cantidad: ingrediente.tipo === 'Cantidad' ? Number(ingrediente.cantidad) : null,
        precio: Number(ingrediente.precio) || 0,
        tipo:   ingrediente.tipo === 'Fijo'
          ? 0
          : ingrediente.tipo === 'Cantidad'
          ? 1
          : ingrediente.tipo === 'Carne'
          ? 2
          : 0
      }));

    const hamburDTO: HamburguesasDTO = {
      nombre: formValue.nombre ?? undefined,
      precio: formValue.precio,
      descripcion: formValue.descripcion ?? undefined,
      imagenUrl: formValue.imagenUrl ?? undefined,
      listIngredientes: ingredientes
    };

    this.hamburguesa.create(hamburDTO).subscribe({
      next: () => {
        console.log({ ...hamburDTO, descripcion: formValue.descripcion });
        this.showSuccessModal = true;
      },
      error: () => {
        this.showErrorModal = true;
        this.errorMessage = 'Error al crear la hamburguesa.';
      }
    });
  }

  onImageError(): void {
    const imageControl = this.form.get('imagenUrl');
    if (!imageControl?.value) {
      return;
    }

    void Promise.resolve().then(() => {
      imageControl.reset('', { emitEvent: true });
    });
  }

  createIngredienteGroup(): FormGroup {
    return this.fb.group({
      nombre: [''],
      cantidad: [],
      precio: [],
      tipo: ['Fijo'] 
    });
  }

  verPedidos() {
    this.router.navigate(['/verPedidos'])
  }
}
