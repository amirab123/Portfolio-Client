import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../user-service';  

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) {}

  canActivate(): boolean {
    if (this.userService.isLoggedIn() && this.userService.isAdmin()) {
      return true;
    }
    alert('Accès refusé : vous devez être administrateur');
    this.router.navigate(['/login']);
    return false;
  }
}
