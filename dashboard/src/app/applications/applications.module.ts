import { AppMaterialModule } from './../app-material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplicationsRoutingModule } from './applications-routing.module';
import { ListComponent } from './list/list.component';

@NgModule({
  imports: [
    CommonModule,
    ApplicationsRoutingModule,
    AppMaterialModule
  ],
  declarations: [ListComponent]
})
export class ApplicationsModule { }
