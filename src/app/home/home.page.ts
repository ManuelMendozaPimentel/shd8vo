import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone:false,
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  showSoporte: boolean = false; // Controla la visibilidad del modal
  screen: string = 'signin'; // Pantalla inicial (login)
  formData: FormGroup; // Formulario reactivo

  // Credenciales definidas
  private validCredentials = {
    email: 'adminutcv@gmail.com',
    password: '12345678',
  };

  constructor(private fb: FormBuilder, private router: Router) {
    this.formData = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  // Cambiar entre pantallas (login y recuperación de contraseña)
  change(screen: string) {
    this.screen = screen;
    this.formData.reset(); // Limpiar el formulario al cambiar de pantalla
  }

  // Función para iniciar sesión
  login() {
    if (this.formData.valid) {
      const email = this.formData.get('email')?.value;
      const password = this.formData.get('password')?.value;

      if (
        email === this.validCredentials.email &&
        password === this.validCredentials.password
      ) {
        localStorage.setItem('isLoggedIn', 'true'); // Guardar estado de autenticación
        this.router.navigate(['/inventario']); // Redirigir a la página de inventario
      } else {
        alert('Credenciales incorrectas');
      }
    } else {
      alert('Por favor, completa el formulario correctamente');
    }
  }

  // Función para recuperar contraseña
  resetPassword() {
    const email = this.formData.get('email')?.value;
    if (email) {
      alert(`Se ha enviado un enlace de recuperación a ${email}`);
      this.change('signin'); // Cambiar a la pantalla de login
    } else {
      alert('Por favor, ingresa tu correo electrónico');
    }
  }

  // Función para mostrar el modal
  mostrarSoporte() {
    this.showSoporte = true;
  }

  // Función para cerrar el modal
  cerrarSoporte() {
    this.showSoporte = false;
  }
}