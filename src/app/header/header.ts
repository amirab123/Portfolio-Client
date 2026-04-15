import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../user-service'; 
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule , RouterModule],
    standalone: true,
  templateUrl: './header.html',
styleUrls: ['./header.css'],
})
export class Header {
title = '';
  menuOpen = false;

  constructor(private router: Router, public userService: UserService) {
this.router.events.subscribe(event => {
  if (event instanceof NavigationEnd) {
    const url = event.urlAfterRedirects;
    if (url.startsWith('/accueil')) this.title = 'Accueil';
    else if (url.startsWith('/accomplissements')) this.title = 'Accomplissements';
    else if (url.startsWith('/admin')) this.title = 'Admin';
    else if (url.startsWith('/login')) this.title = 'Login';
    else if (url.startsWith('/register')) this.title = 'Register';
    else this.title = '';
  }
});

  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/']);
  }
}