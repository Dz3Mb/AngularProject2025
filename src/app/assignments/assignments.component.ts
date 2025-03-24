import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Assignment } from './assignment.model';
import { AssignmentDetailComponent } from './assignment-detail/assignment-detail.component';
import { AddAssignmentComponent } from './add-assignment/add-assignment.component';
import { RenduDirective } from '../shared/rendu.directive';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { AssignmentsService } from '../shared/assignments.service';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { filter } from 'rxjs/operators';
import { AuthService } from '../shared/auth.service'; // ✅

@Component({
  selector: 'app-assignments',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    MatButtonModule,
    AssignmentDetailComponent,
    AddAssignmentComponent,
    RenduDirective,
    RouterModule,
    MatIconModule
  ],
  templateUrl: './assignments.component.html',
  styleUrls: []
})
export class AssignmentsComponent implements OnInit {
  titre = 'Mon application sur les Assignments !';
  assignments: Assignment[] = [];
  formVisible = false;
  assignmentSelectionne?: Assignment;
  isAdmin = false;

  constructor(
    private router: Router,
    private assignmentsService: AssignmentsService,
    private authService: AuthService // ✅ injection
  ) {}

  ngOnInit(): void {
    this.refreshAssignments();
    this.updateAdminStatus();

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event) => {
        if ((event as NavigationEnd).urlAfterRedirects === '/') {
          this.refreshAssignments();
          this.updateAdminStatus(); // ✅ mettre à jour après navigation
        }
      });
  }

  updateAdminStatus() {
    this.isAdmin = this.authService.isAdmin();
  }

  refreshAssignments() {
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

  onAddAssignmentBtnClick() {
    this.formVisible = true;
  }
}
