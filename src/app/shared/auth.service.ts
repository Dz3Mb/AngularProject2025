import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

interface User {
  login: string;
  password: string;
  role: 'user' | 'admin';
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users: User[] = [
    { login: 'admin', password: 'admin123', role: 'admin' },
    { login: 'malik', password: 'test123', role: 'user' }
  ];

  private loggedIn = false;
  private currentUser?: User;

  constructor(private router: Router) {}

  login(login: string, password: string): boolean {
    const user = this.users.find(u => u.login === login && u.password === password);
    if (user) {
      this.loggedIn = true;
      this.currentUser = user;
      return true;
    }
    return false;
  }

  logout() {
    this.loggedIn = false;
    this.currentUser = undefined;
    this.router.navigate(['/login']);
  }

  isLogged(): boolean {
    return this.loggedIn;
  }

  isAdmin(): boolean {
    return this.currentUser?.role === 'admin';
  }
}
