import { Routes, RouterModule } from '@angular/router';

import { HeaderComponent } from './header.component';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
    {
        path: '',
        component: HeaderComponent
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
