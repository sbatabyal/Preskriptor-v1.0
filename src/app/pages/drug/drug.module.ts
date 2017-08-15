import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppTranslationModule } from '../../app.translation.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { RouterModule } from '@angular/router';
import { DataTableModule } from "angular2-datatable";
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { DrugComponent } from './drug.component';
import { PostDrugComponent } from './components/add-edit/postDrug.component';
import { GetDrugComponent } from './components/view/getDrugs.component';
import { AdminPageService } from '../../services/index';
import { routing } from './drug.routing';

const DRUG_COMPONENT = [DrugComponent, PostDrugComponent, GetDrugComponent];
const ADMIN_SERVICES = [AdminPageService];

@NgModule({
    imports: [
        CommonModule,
        AppTranslationModule,
        ReactiveFormsModule,
        FormsModule,
        NgaModule,
        RouterModule,
        DataTableModule,
        Ng2SmartTableModule,
        routing                
    ],
    declarations: [
        ...DRUG_COMPONENT,        
    ],
    exports: [
        ...DRUG_COMPONENT        
    ],
    providers: [
        ...ADMIN_SERVICES
    ]
    //bootstrap: [
    //    ...TEST_COMPONENT
    //]   
})

export class DrugModule { }
