import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './login.component.html',
  styleUrls: []
})
export class LoginComponent {
  login = '';
  password = '';
  error = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    if (this.authService.login(this.login, this.password)) {
      this.router.navigate(['/']);
    } else {
      this.error = 'Identifiants invalides';
    }
  }
}
