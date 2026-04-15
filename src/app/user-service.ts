import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { ModelUser } from './ModelUser';

export interface LoginRequest {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private API = 'http://localhost:8085/auth';


  currentUser = signal<ModelUser | null>(null);

  constructor(private http: HttpClient) {
   
    const stored = localStorage.getItem('user');
    if (stored) {
      const user = JSON.parse(stored) as ModelUser;
      this.currentUser.set(user);
    }
  }

login(credentials: LoginRequest): Observable<ModelUser> {
  return this.http
    .post(this.API + '/login', credentials, { responseType: 'text' }) 
    .pipe(
      map((text: string) => {
        console.log('Réponse login texte :', text);
        const role = text.toLowerCase().includes('admin') ? 'admin' : 'user';
        const user: ModelUser = {
          username: credentials.username,
          role,
          password: ''
        };
        this.currentUser.set(user);
        localStorage.setItem('user', JSON.stringify(user));
        return user;
      })
    );
}





  register(user: ModelUser): Observable<ModelUser> {
    return this.http
      .post<ModelUser>(this.API + '/register', user)
      .pipe(
        map((newUser: ModelUser) => {
    
          this.currentUser.set(newUser);
          localStorage.setItem('user', JSON.stringify(newUser));
          return newUser;
        })
      );
  }


  logout(): void {
    this.currentUser.set(null);
    localStorage.removeItem('user');
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

  getUsername(): string {
  return this.currentUser()?.username || '';
}

}
