import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../AuthService';
import Swal from 'sweetalert2';

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
 constructor(private auth: AuthService, private router: Router) {}

  canActivate(): boolean {
  if (this.auth.isLoggedIn() && this.auth.isAdmin()) {
    return true;
  }

  Swal.fire({
    icon: 'error',
    title: 'Accès refusé',
    text: 'Vous n’êtes pas autorisé à accéder à cette page',
    timer: 2500,
    showConfirmButton: false
  });

  this.router.navigate(['/accueil']);
  return false;
}

}