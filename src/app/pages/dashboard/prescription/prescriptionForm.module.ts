import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../../app.translation.module';
//import { NgaModule } from '../../../theme/nga.module';
import { PrescriptionFormComponent } from './index';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AppTranslationModule,
        //NgaModule              
            ],
    declarations: [
        //PrescriptionFormComponent,
    ],
    providers: [
        //HeaderService
    ]
})
export class PrescriptionFormModule { }


