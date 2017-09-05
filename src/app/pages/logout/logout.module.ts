import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { routing } from './logout.routing';
import { LogoutComponent } from './logout.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        routing,        
        NgaModule
    ],
    declarations: [
        LogoutComponent
    ]
})
export class LogoutModule { }