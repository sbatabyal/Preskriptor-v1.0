import { Routes, RouterModule } from '@angular/router';

import { DrugComponent } from './drug.component';
import { PostDrugComponent } from './components/add-edit/postDrug.component';
import { GetDrugComponent } from './components/view/getDrugs.component';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
    {
        path: '',
        component: DrugComponent,
        children: [
            { path: 'post', component: PostDrugComponent },            
            { path: 'get', component: GetDrugComponent }            
        ]
    }
];

export const routing = RouterModule.forChild(routes);
