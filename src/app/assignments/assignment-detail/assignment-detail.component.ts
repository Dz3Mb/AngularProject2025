import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Assignment } from '../assignment.model';
import { AssignmentsService } from '../../shared/assignments.service';

@Component({
  selector: 'app-assignment-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatCheckboxModule
  ],
  templateUrl: './assignment-detail.component.html',
  styleUrls: []
})
export class AssignmentDetailComponent {
  @Input() assignmentTransmis?: Assignment;
  @Output() deleteAssignment = new EventEmitter<Assignment>();

  constructor(private assignmentsService: AssignmentsService) {}

  onDeleteClick() {
    if (this.assignmentTransmis) {
      this.deleteAssignment.emit(this.assignmentTransmis);
    }
  }

  onAssignmentRendu() {
    if (!this.assignmentTransmis) return;

    this.assignmentTransmis.rendu = true;
    this.assignmentsService.updateAssignment(this.assignmentTransmis).subscribe(() => {
      console.log('Assignment mis à jour comme rendu.');
    });
  }
}