import { Component } from '@angular/core';
import { AssignmentsComponent } from './assignments/assignments.component';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    AssignmentsComponent,
    MatToolbarModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: []
})
export class AppComponent {}
