import { Component, signal } from '@angular/core';

import { Header } from './header/header';
import { Accueil } from './accueil/accueil';
import { Accomplissements } from './accomplissements/accomplissements';
import { Register } from './register/register';
import { LoginComponent } from './login/LoginComponent';
import { AuthGuard } from './guards/auth-guard';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';




@Component({
  selector: 'app-root',
   standalone: true,
  imports: [ Header, RouterModule , FormsModule ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('portfolio-angular');

  
}
