import { Component, OnInit } from '@angular/core';
import { Assignment } from '../assignment.model';
import { AssignmentsService } from '../../shared/assignments.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { inject } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-edit-assignment',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatCheckboxModule
  ],
  templateUrl: './edit-assignment.component.html',
  styleUrls: []
})
export class EditAssignmentComponent implements OnInit {
  assignment?: Assignment;

  nom = '';
  dateDeRendu?: Date;
  rendu = false;

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private assignmentsService = inject(AssignmentsService);

  ngOnInit(): void {
    const id = +this.route.snapshot.params['id'];

    this.assignmentsService.getAssignments().subscribe(assignments => {
      const a = assignments.find(asg => asg.id === id);
      if (a) {
        this.assignment = a;
        this.nom = a.nom;
        this.dateDeRendu = new Date(a.dateDeRendu);
        this.rendu = a.rendu;
      }
    });
  }

  onSubmit() {
    if (!this.assignment || !this.nom || !this.dateDeRendu) return;

    this.assignment.nom = this.nom;
    this.assignment.dateDeRendu = this.dateDeRendu;
    this.assignment.rendu = this.rendu;

    this.assignmentsService.updateAssignment(this.assignment).subscribe(() => {
      console.log("Assignment mis à jour.");
      this.router.navigate(['/']);
    });
  }
}