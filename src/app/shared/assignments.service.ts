import { Injectable } from '@angular/core';
import { Assignment } from '../assignments/assignment.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {
  private apiUrl = 'http://localhost:3000/assignments';

  constructor(private http: HttpClient) {}

  getAssignments(): Observable<Assignment[]> {
    return this.http.get<Assignment[]>(this.apiUrl);
  }

  addAssignment(a: Assignment): Observable<Assignment> {
    return this.http.post<Assignment>(this.apiUrl, a);
  }

  deleteAssignment(a: Assignment): Observable<void> {
    const url = `${this.apiUrl}/${a.id}`;
    return this.http.delete<void>(url);
  }

  updateAssignment(a: Assignment): Observable<string> {
    const url = `${this.apiUrl}/${a.id}`;
    return this.http.put<string>(url, a);
  }
}