import { Injectable, signal } from '@angular/core';
import { ModelUser } from './ModelUser';

@Injectable({ providedIn: 'root' })
export class AuthService {
  currentUser = signal<ModelUser | null>(null);

  constructor() {

    const stored = localStorage.getItem('user');
    if (stored) {
      const user = JSON.parse(stored) as ModelUser;
      this.currentUser.set(user);
      console.log('Utilisateur initialisé depuis localStorage :', user);
    }
  }

  isLoggedIn(): boolean {
    return !!this.currentUser();
  }

  isAdmin(): boolean {
    return this.currentUser()?.role?.toLowerCase() === 'admin';
  }

  getUser(): ModelUser | null {
    return this.currentUser();
  }

}

 


