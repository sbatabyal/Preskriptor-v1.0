import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { routing }       from './pages.routing';
import { NgaModule } from '../theme/nga.module';
import { AppTranslationModule } from '../app.translation.module';
import { DataTableModule } from "angular2-datatable";
import { AuthGuard } from "./_guards";

import { Pages } from './pages.component';
//import { Ng2CompleterModule } from "ng2-completer";

@NgModule({
    imports: [CommonModule, AppTranslationModule, NgaModule.forRoot(), routing, DataTableModule],
    declarations: [Pages],
    bootstrap: [Pages],
    providers: [AuthGuard]
})
export class PagesModule {
}
