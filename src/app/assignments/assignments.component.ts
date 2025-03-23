import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Assignment } from './assignment.model';
import { AssignmentDetailComponent } from './assignment-detail/assignment-detail.component';
import { AddAssignmentComponent } from './add-assignment/add-assignment.component';
import { RenduDirective } from '../shared/rendu.directive';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { AssignmentsService } from '../shared/assignments.service';

@Component({
  selector: 'app-assignments',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    MatButtonModule,
    AssignmentDetailComponent,
    AddAssignmentComponent,
    RenduDirective
  ],
  templateUrl: './assignments.component.html',
  styleUrls: []
})
export class AssignmentsComponent implements OnInit {
  titre = 'Mon application sur les Assignments !';
  assignments: Assignment[] = [];
  formVisible = false;
  assignmentSelectionne?: Assignment;

  constructor(private assignmentsService: AssignmentsService) {}

  ngOnInit() {
    this.assignmentsService.getAssignments().subscribe(data => {
      this.assignments = data;
    });
  }
  
  onNouvelAssignment(event: Assignment) {
    this.assignmentsService.addAssignment(event).subscribe(() => {
      this.refreshAssignments();
      this.formVisible = false;
    });
  }

  onAssignmentClick(assignment: Assignment) {
    this.assignmentSelectionne = assignment;
  }
  
  onAssignmentDeleted(assignment: Assignment) {
    this.assignmentsService.deleteAssignment(assignment).subscribe(() => {
      this.refreshAssignments();
      this.assignmentSelectionne = undefined;
    });
  }
  
  refreshAssignments() {
    this.assignmentsService.getAssignments().subscribe(data => {
      this.assignments = data;
    });
  }
  
  onAddAssignmentBtnClick() {
    this.formVisible = true;
  }

}
