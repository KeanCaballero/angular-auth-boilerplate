import { Routes } from '@angular/router';

export const adminRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./admin.component').then(m => m.AdminComponent)
  },
  {
    path: 'accounts',
    loadComponent: () => import('./accounts/list.component').then(m => m.ListComponent)
  },
  {
    path: 'accounts/add',
    loadComponent: () => import('./accounts/add-edit.component').then(m => m.AddEditComponent)
  },
  {
    path: 'accounts/edit/:id',
    loadComponent: () => import('./accounts/add-edit.component').then(m => m.AddEditComponent)
  }
];