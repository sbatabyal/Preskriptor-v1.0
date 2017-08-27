import { Routes, RouterModule }  from '@angular/router';
import { Pages } from './pages.component';
import { ModuleWithProviders } from '@angular/core';
import { AuthGuard } from './_guards';
// noinspection TypeScriptValidateTypes

// export function loadChildren(path) { return System.import(path); };

export const routes: Routes = [
  {
    path: 'login',
    loadChildren: 'app/pages/login/login.module#LoginModule'
  },
  //{
  //  path: 'register',
  //  loadChildren: 'app/pages/register/register.module#RegisterModule'
  //},  

  {
    path: 'pages',
    component: Pages,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule',  canActivate: [AuthGuard] },    
      { path: 'header', loadChildren: './header/Header.module#HeaderModule', canActivate: [AuthGuard]}, 
      { path: 'about', loadChildren: './about/about.module#AboutModule', canActivate: [AuthGuard] },
      { path: 'contact', loadChildren: './contact/contactUs.module#ContactUsModule', canActivate: [AuthGuard] }, 
      { path: 'drug', loadChildren: './drug/Drug.module#DrugModule', canActivate: [AuthGuard] }, 
      { path: 'test', loadChildren: './test/Test.module#TestModule', canActivate: [AuthGuard] }, 
      { path: 'editors', loadChildren: './editors/editors.module#EditorsModule' },   
      { path: 'logout', loadChildren: './logout/logout.module#LogoutModule' },         
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
