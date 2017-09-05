import { Routes, RouterModule } from '@angular/router';

import { ContactUsComponent } from './contactUs.component';

const routes: Routes = [
    {
        path: '',
        component: ContactUsComponent
    }
];

export const routing = RouterModule.forChild(routes);