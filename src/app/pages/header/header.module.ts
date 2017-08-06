import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppTranslationModule } from '../../app.translation.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './header.component';
import { HeaderService } from '../../services/index';
import { routing } from './header.routing';

const HEADER_COMPONENT = [HeaderComponent];
const HEADER_SERVICES = [HeaderService];

@NgModule({
    imports: [
        CommonModule,
        AppTranslationModule,
        ReactiveFormsModule,
        FormsModule,
        NgaModule,
        RouterModule,
        routing
    ],
    declarations: [
        //...HEADER_COMPONENT
    ],
    exports: [
        //...HEADER_COMPONENT
    ],
    providers: [
        ...HEADER_SERVICES
    ]
})

export class HeaderModule { }
