import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Assignment } from '../assignment.model';
import { AssignmentsService } from '../../shared/assignments.service';
import { ActivatedRoute } from '@angular/router';
import { inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';


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
export class AssignmentDetailComponent implements OnInit {
  assignmentTransmis?: Assignment;
  @Output() deleteAssignment = new EventEmitter<Assignment>();

  private route = inject(ActivatedRoute);
  private assignmentsService = inject(AssignmentsService);
  private router = inject(Router);

  ngOnInit(): void {
    const id = +this.route.snapshot.params['id'];
    this.assignmentsService.getAssignments().subscribe(assignments => {
      this.assignmentTransmis = assignments.find(a => a.id === id);
    });
  }

  onDeleteClick() {
    if (!this.assignmentTransmis) return;

    this.assignmentsService.deleteAssignment(this.assignmentTransmis).subscribe(() => {
      console.log("Assignment supprimé.");
      this.router.navigate(['/']); // ✅ fonctionnera maintenant
    });
  }

  onAssignmentRendu() {
    if (!this.assignmentTransmis) return;
  
    this.assignmentTransmis.rendu = true;
  
    this.assignmentsService.updateAssignment(this.assignmentTransmis).subscribe(() => {
      console.log('Assignment marqué comme rendu.');
      this.router.navigate(['/']);
    });
  }  
}