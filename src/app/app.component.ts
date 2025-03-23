import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,
    MatToolbarModule
  ],
  templateUrl: './app.component.html',
  styleUrls: []
})
export class AppComponent { }
