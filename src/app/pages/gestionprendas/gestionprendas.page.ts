import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InventarioService } from '../../services/inventario.service';
import { Prenda } from '../../ropa.model';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-gestionprendas',
  standalone:false,
  templateUrl: './gestionprendas.page.html',
  styleUrls: ['./gestionprendas.page.scss'],
})
export class GestionprendasPage implements OnInit {
  prendaForm: FormGroup;
  currentYear = new Date().getFullYear();

  constructor(
    private fb: FormBuilder,
    private inventarioService: InventarioService,
    private router: Router,
    private toastCtrl: ToastController
  ) {
    this.prendaForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(50)]],
      disenador: ['', [Validators.required, Validators.maxLength(30)]],
      anoColeccion: ['', [
        Validators.required, 
        Validators.min(1900),
        Validators.max(this.currentYear)
      ]],
      precio: ['', [
        Validators.required,
        Validators.min(1),
        Validators.max(1000000)
      ]]
    });
  }

  async agregarPrenda() {
    if (this.prendaForm.valid) {
      const nuevaPrenda: Prenda = {
        ...this.prendaForm.value,
        id: Date.now() // Generar ID único
      };
      
      this.inventarioService.agregarPrenda(nuevaPrenda);
      await this.mostrarToast('Prenda agregada exitosamente', 'success');
      this.prendaForm.reset();
      this.router.navigate(['/inventario']);
    } else {
      await this.mostrarToast('Por favor complete todos los campos correctamente', 'danger');
      this.marcarCamposInvalidos();
    }
  }

  private marcarCamposInvalidos() {
    Object.keys(this.prendaForm.controls).forEach(campo => {
      const control = this.prendaForm.get(campo);
      if (control?.invalid) {
        control.markAsTouched();
      }
    });
  }

  private async mostrarToast(mensaje: string, color: string) {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      duration: 3000,
      position: 'top',
      color: color,
      buttons: [{ icon: 'close', role: 'cancel' }]
    });
    toast.present();
  }

  ngOnInit() {}
}