import { Routes, RouterModule } from '@angular/router';

import { TestComponent } from './test.component';
import { PostTestComponent } from './components/add-edit/postTest.component';
import { GetTestComponent } from './components/view/getTests.component';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
    {
        path: '',
        component: TestComponent,
        children: [
            { path: 'post', component: PostTestComponent },
            { path: 'get', component: GetTestComponent }
        ]
    }
];

//export const routing: ModuleWithProviders = RouterModule.forChild(routes);

export const routing = RouterModule.forChild(routes);
