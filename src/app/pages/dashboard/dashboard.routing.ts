import { Routes, RouterModule }  from '@angular/router';

import { Dashboard } from './dashboard.component';
import { PrescriptionFormComponent } from '././prescription';
import { ModuleWithProviders } from '@angular/core';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: Dashboard,
    children: [
        //{ path: 'prescription', component: PrescriptionFormComponent }
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
