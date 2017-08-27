import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';
import { Ng2CompleterModule } from "ng2-completer";
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import { DataTableModule } from "angular2-datatable";

import { Dashboard } from './dashboard.component';
import { routing }       from './dashboard.routing';

import { PrescriptionFormComponent } from './prescription';
import { PieChart } from './pieChart';
import { PieChartService } from './pieChart/pieChart.service';
import { PrescriptionFormModule } from './prescription/prescriptionForm.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppTranslationModule,
    NgaModule,
    routing,
    Ng2CompleterModule,
    Ng2Bs3ModalModule,
    DataTableModule,
    PrescriptionFormModule      
  ],
  declarations: [
    PrescriptionFormComponent,    
    PieChart,    
    Dashboard
  ],
  providers: [    
    PieChartService    
  ]
})
export class DashboardModule {}
