import { Routes, RouterModule } from '@angular/router';

import { HeaderComponent } from './header.component';
import { PostHeaderComponent } from './components/add-edit/postHeader.component';
import { GetHeaderComponent } from './components/view/getHeaders.component';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
    {
        path: '',
        component: HeaderComponent,
        children: [
            { path: 'post', component: PostHeaderComponent },
            { path: 'get', component: GetHeaderComponent }
        ]
    }
];

export const routing = RouterModule.forChild(routes);
