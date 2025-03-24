import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from './shared/auth.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './app.component.html',
  styleUrls: []
})
export class AppComponent {
  constructor(private router: Router, private authService: AuthService) {}

  get isLogged() {
    return this.authService.isLogged();
  }

  get isAdmin() {
    return this.authService.isAdmin();
  }

  logout() {
    this.authService.logout();
  }
}
