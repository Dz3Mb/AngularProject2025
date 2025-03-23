import { Injectable } from '@angular/core';
import { Assignment } from '../assignments/assignment.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {
  private assignments: Assignment[] = [
    { id: 1, nom: 'TP Angular', dateDeRendu: new Date('2024-04-01'), rendu: true },
    { id: 2, nom: 'TP React', dateDeRendu: new Date('2024-04-10'), rendu: false }
  ];

  // 🔁 Simuler un appel réseau
  getAssignments(): Observable<Assignment[]> {
    return of(this.assignments);
  }

  addAssignment(a: Assignment): Observable<string> {
    a.id = Math.floor(Math.random() * 100000);
    this.assignments.push(a);
    return of("Ajouté !");
  }

  deleteAssignment(a: Assignment): Observable<string> {
    this.assignments = this.assignments.filter(asg => asg.id !== a.id);
    return of("Supprimé !");
  }

  updateAssignment(a: Assignment): Observable<string> {
    const index = this.assignments.findIndex(asg => asg.id === a.id);
    if (index > -1) this.assignments[index] = a;
    return of("Mis à jour !");
  }
}
