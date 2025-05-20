import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { 
    path: 'login', 
    loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent) 
  },
  {
    path: '',
    loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent),
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'prazos',
        pathMatch: 'full'
      },
      {
        path: 'prazos',
        loadComponent: () => import('./features/prazos/prazos.component').then(m => m.PrazosComponent)
      },
      {
        path: 'notificacoes',
        loadComponent: () => import('./features/notificacoes/notificacoes.component').then(m => m.NotificacoesComponent)
      },
      {
        path: 'configuracoes',
        loadComponent: () => import('./features/configuracoes/configuracoes.component').then(m => m.ConfiguracoesComponent)
      }
    ]
  },
  { path: '**', redirectTo: 'login' }
];