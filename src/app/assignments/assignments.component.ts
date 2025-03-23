import { Component, OnInit } from '@angular/core';
import { RenduDirective } from '../shared/rendu.directive';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';

interface Assignment {
  nom: string;
  dateDeRendu: string;
  rendu: boolean;
}

@Component({
  selector: 'app-assignments',
  standalone: true,
  imports: [
    CommonModule,
    RenduDirective,
    FormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatButtonModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './assignments.component.html',
  styleUrl: './assignments.component.css',
})
export class AssignmentsComponent implements OnInit {
  nomDevoir = "";
  dateDeRendu = "";
  ajoutActive = false;

  assignments: Assignment[] = [];

  ngOnInit(): void {
    console.log("Composant Assignments initialisé");

    setTimeout(() => {
      this.ajoutActive = true;
    }, 2000);

    this.assignments = [
      { nom: "Devoir de maths", dateDeRendu: "2025-03-25", rendu: true },
      { nom: "TP de physique", dateDeRendu: "2025-04-01", rendu: false }
    ];
  }

  ajouterAssignment() {
    if (this.nomDevoir && this.dateDeRendu) {
      this.assignments.push({
        nom: this.nomDevoir,
        dateDeRendu: this.dateDeRendu,
        rendu: false
      });

      this.nomDevoir = "";
      this.dateDeRendu = "";
    }
  }

  onSubmit(event: Event) {
    event.preventDefault();
    this.ajouterAssignment();
  }
}