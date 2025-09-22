import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    private hamburguesa: HamburguesasService
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
      this.ingredientes.at(0).reset({ nombre: '', cantidad: 1 });
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

  get ingredientesPreview(): Array<{ nombre?: string; cantidad?: number }> {
    return this.ingredientes.controls.map(control => control.value as { nombre?: string; cantidad?: number });
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
      .filter((ingrediente: any) => ingrediente?.nombre && ingrediente?.cantidad !== null && ingrediente?.cantidad !== undefined)
      .map((ingrediente: any) => ({
        nombre: ingrediente.nombre,
        cantidad: Number(ingrediente.cantidad)
      }));

    const hamburDTO: HamburguesasDTO = {
      nombre: formValue.nombre ?? undefined,
      precio: formValue.precio,
      imagenUrl: formValue.imagenUrl ?? undefined,
      listIngredientes: ingredientes
    };

    this.hamburguesa.create(hamburDTO).subscribe({
      next: () => {
        console.log({ ...hamburDTO, descripcion: formValue.descripcion });
      }
    });
  }

  private createIngredienteGroup(): FormGroup {
    return this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      cantidad: [1, [Validators.required, Validators.min(1)]]
    });
  }
}
