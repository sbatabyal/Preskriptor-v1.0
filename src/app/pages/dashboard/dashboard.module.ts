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

//import { PopularApp } from './popularApp';
import { PrescriptionFormComponent } from './prescription';
import { PieChart } from './pieChart';
import { TrafficChart } from './trafficChart';
//import { UsersMap } from './usersMap';
//import { LineChart } from './lineChart';
import { Feed } from './feed';
import { Todo } from './todo';
import { Calendar } from './calendar';
import { CalendarService } from './calendar/calendar.service';
import { FeedService } from './feed/feed.service';
//import { LineChartService } from './lineChart/lineChart.service';
import { PieChartService } from './pieChart/pieChart.service';
import { TodoService } from './todo/todo.service';
import { TrafficChartService } from './trafficChart/trafficChart.service';
//import { UsersMapService } from './usersMap/usersMap.service';
import { PrescriptionFormModule } from './prescription/prescriptionForm.module';
//import { AddHeaderModule } from '../addHeaders/addHeader.module';

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
    PrescriptionFormModule,
    //AddHeaderModule          
  ],
  declarations: [
    PrescriptionFormComponent,
    //PopularApp,
    PieChart,
    TrafficChart,
    //UsersMap,
    //LineChart,
    Feed,
    Todo,
    Calendar,
    Dashboard
  ],
  providers: [
    CalendarService,
    FeedService,
    //LineChartService,
    PieChartService,
    TodoService,
    TrafficChartService,
    //UsersMapService
  ]
})
export class DashboardModule {}
