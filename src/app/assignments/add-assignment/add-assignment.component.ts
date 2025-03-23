import { Component, Output, EventEmitter } from '@angular/core';
import { Assignment } from '../assignment.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-add-assignment',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule
  ],
  templateUrl: './add-assignment.component.html',
  styleUrls: []
})
export class AddAssignmentComponent {
  nomDevoir = '';
  dateDeRendu?: Date;
  @Output() nouvelAssignment = new EventEmitter<Assignment>();

  onSubmit() {
    if (!this.nomDevoir || !this.dateDeRendu) return;

    const newAssignment: Assignment = {
      id: Math.floor(Math.random() * 10000),
      nom: this.nomDevoir,
      dateDeRendu: this.dateDeRendu,
      rendu: false
    };

    this.nouvelAssignment.emit(newAssignment);

    this.nomDevoir = '';
    this.dateDeRendu = undefined;
  }
}
