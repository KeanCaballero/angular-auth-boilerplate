import { Routes } from '@angular/router';
import { AuthGuard } from '@app/_helpers';
import { Role } from '@app/_models';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () => import('./home/home-routing-module').then(m => m.HomeRoutingModule)
  },
  {
    path: 'account',
    loadChildren: () => import('./account/account.routes').then(m => m.accountRoutes)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.routes').then(m => m.profileRoutes),
    canActivate: [AuthGuard]
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.routes').then(m => m.adminRoutes),
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  },
  { path: '**', redirectTo: 'home' }
];

