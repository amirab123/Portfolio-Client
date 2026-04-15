import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { take } from 'rxjs/operators';
import { UserService } from '../user-service';
import { ModelUser } from '../ModelUser';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class LoginComponent {

  loading = false;
  errorMessage = '';
form: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

login(): void {
  if (this.form.invalid) return;

  const credentials: ModelUser = this.form.value;
  console.log('Tentative login avec :', credentials);

  this.userService.login(credentials).subscribe({
    next: user => {
      Swal.fire({
        icon: 'success',
        title: `Bienvenue ${user.username}`,
        text: user.role === 'admin' ? 'Vous êtes administrateur' : 'Connexion réussie',
        timer: 2000,
        showConfirmButton: false
      });

 
      if (user.role.toLowerCase() === 'admin') {
        this.router.navigate(['/admin']);
      } else {
Swal.fire({
  icon: 'error',
    title: 'Connexion échouée',
    text: 'Nom d’utilisateur ou mot de passe incorrect',

  timer:5000,
  showConfirmButton: false
});

        this.router.navigate(['/accueil']);
      }
    },
error: err => {
  Swal.fire({
    icon: 'error',
    title: 'Connexion échouée',
    text: err.message || 'Nom d’utilisateur ou mot de passe incorrect'
  });
}



  });
}



}