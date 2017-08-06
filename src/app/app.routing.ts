import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
  //{ path: '', redirectTo: 'pages', pathMatch: 'full' },
  //{ path: '**', redirectTo: 'pages/dashboard' },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'pages/login' }, //First page to Load
  
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, { useHash: true });

