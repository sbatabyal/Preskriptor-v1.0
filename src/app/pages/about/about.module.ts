import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { AboutComponent } from './about.component';
import { routing } from './about.routing';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        routing,
        NgaModule
    ],
    declarations: [
        AboutComponent
    ]
})
export class AboutModule { }