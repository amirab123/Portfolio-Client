import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators ,AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user-service';  
import { ModelUser } from '../ModelUser';
import Swal from 'sweetalert2';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
})
export class Register {
  form: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],

      confirmPassword: ['', Validators.required],
      role: ['ADMIN', Validators.required] 
    }, { validators: this.passwordMatchValidator });
  }


  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      return { passwordMismatch: true };
    }

    return null;
  }

  register(): void {
    if (this.form.invalid) return;

    const { username, password, role } = this.form.value;
    const newUser = new ModelUser(username, role, password);

    this.userService.register(newUser).subscribe({
      next: () => {
    
        if (role.toUpperCase() === 'ADMIN') {
          Swal.fire({
            icon: 'success',
            title: 'Administrateur créé',
            text: `L'administrateur ${username} a été enregistré avec succès`,
            timer: 2500,
            showConfirmButton: false
          });
        } else {
          Swal.fire({
            icon: 'success',
            title: 'Utilisateur créé',
            text: `L'utilisateur ${username} a été enregistré avec succès`,
            timer: 2000,
            showConfirmButton: false
          });
        }

    
        this.router.navigate(['/admin']);
      },
      error: err => {
        console.error('Erreur registration :', err);
        this.errorMessage = err.error?.message || 'Enregistrement échoué';
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: this.errorMessage,
          timer: 2500,
          showConfirmButton: false
        });
      }
    });
  }
}
