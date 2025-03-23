import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'assignments',
    loadComponent: () => import('./assignments/assignments.component').then(m => m.AssignmentsComponent)
  }
];
