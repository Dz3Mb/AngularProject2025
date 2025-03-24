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
import { AuthService } from '../../shared/auth.service';


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

  isAdmin = false;
  isLogged = false;

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private assignmentsService = inject(AssignmentsService);
  private authService = inject(AuthService);

  ngOnInit() {
    const id = +this.route.snapshot.params['id'];
    const allAssignments = this.assignmentsService.getAssignments();
    allAssignments.subscribe(assignments => {
      const a = assignments.find(item => item.id === id);
      if (!a) return;
      this.assignment = a;
      this.nom = a.nom;
      this.dateDeRendu = new Date(a.dateDeRendu);
      this.rendu = a.rendu;
    });

    this.isAdmin = this.authService.isAdmin();
    this.isLogged = this.authService.isLogged();
  }

  delete() {
    if (!this.assignment) return;
    this.assignmentsService.deleteAssignment(this.assignment).subscribe(() => {
      this.router.navigate(['/']);
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