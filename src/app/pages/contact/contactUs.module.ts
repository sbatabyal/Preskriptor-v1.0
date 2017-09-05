import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { ContactUsComponent } from './contactUs.component';
import { routing } from './contactUs.routing';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        routing,
        NgaModule
    ],
    declarations: [
        ContactUsComponent
    ]
})
export class ContactUsModule { }