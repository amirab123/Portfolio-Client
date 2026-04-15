import { Routes } from '@angular/router';
import { Accueil } from './accueil/accueil';
import { Accomplissements } from './accomplissements/accomplissements';
import { AdminComp } from './admin/admin';
import { LoginComponent } from './login/LoginComponent';
import { Register } from './register/register';
import { AuthGuard } from './guards/auth-guard';
import { AdminGuard } from './guards/AdminGuard';






export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'accueil', component: Accueil },
  { path: 'accomplissements', component: Accomplissements },
  { path: 'admin', component: AdminComp, canActivate: [AuthGuard, AdminGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: Register },
  { path: '**', redirectTo: '' }
];

