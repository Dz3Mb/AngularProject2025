import { Routes } from '@angular/router';
import { AssignmentsComponent } from './assignments/assignments.component';
import { AddAssignmentComponent } from './assignments/add-assignment/add-assignment.component';
import { AssignmentDetailComponent } from './assignments/assignment-detail/assignment-detail.component';
import { EditAssignmentComponent } from './assignments/edit-assignment/edit-assignment.component';

export const routes: Routes = [
  {
    path: '',
    component: AssignmentsComponent,
    runGuardsAndResolvers: 'always',
  },
  { path: 'add', component: AddAssignmentComponent },
  { path: 'assignment/:id', component: AssignmentDetailComponent },
  { path: 'edit/:id', component: EditAssignmentComponent },
];
