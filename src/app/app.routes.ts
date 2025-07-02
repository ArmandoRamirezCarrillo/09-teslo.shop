import { Routes } from '@angular/router';
import { NotAunthenticatedGuard } from '@auth/guards/not-aunthenticated.guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes'),
    canMatch: [NotAunthenticatedGuard],
  },
  {
    path: '',
    loadChildren: () => import('./store-front/store-front.route')
  }
];
