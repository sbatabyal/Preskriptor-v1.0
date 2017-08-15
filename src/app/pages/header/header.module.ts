import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppTranslationModule } from '../../app.translation.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './header.component';
import { PostHeaderComponent } from './components/add-edit/postHeader.component';
import { GetHeaderComponent } from './components/view/getHeaders.component';
import { AdminPageService } from '../../services/index';
import { routing } from './header.routing';

const HEADER_COMPONENT = [HeaderComponent, PostHeaderComponent, GetHeaderComponent];
const ADMIN_SERVICES = [AdminPageService];

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
        ...HEADER_COMPONENT,        
    ],
    exports: [
        ...HEADER_COMPONENT        
    ],
    providers: [
        ...ADMIN_SERVICES
    ]     
})

export class HeaderModule { }
