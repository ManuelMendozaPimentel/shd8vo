// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private router: Router) {}

  canActivate(): boolean {
    // Agrega logs para depuración
    console.log('Ejecutando AuthGuard');
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    console.log('Estado de autenticación:', isLoggedIn);

    if (!isLoggedIn) {
      console.log('Redirigiendo a login');
      this.router.navigate(['/home']);
      return false;
    }
    return true;
  }
}