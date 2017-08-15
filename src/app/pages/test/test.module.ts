import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppTranslationModule } from '../../app.translation.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { RouterModule } from '@angular/router';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { TestComponent } from './test.component';
import { PostTestComponent } from './components/add-edit/postTest.component';
import { GetTestComponent } from './components/view/getTests.component';
import { AdminPageService } from '../../services/index';
import { routing } from './test.routing';

const TEST_COMPONENT = [TestComponent, PostTestComponent, GetTestComponent];
const ADMIN_SERVICES = [AdminPageService];

@NgModule({
    imports: [
        CommonModule,
        AppTranslationModule,
        ReactiveFormsModule,
        FormsModule,
        NgaModule,
        RouterModule,        
        Ng2SmartTableModule,
        routing                
    ],
    declarations: [
        ...TEST_COMPONENT,        
    ],
    exports: [
       ...TEST_COMPONENT        
    ],
    providers: [
        ...ADMIN_SERVICES
    ]
    //bootstrap: [
    //    ...TEST_COMPONENT
    //]   
})

export class TestModule { }
