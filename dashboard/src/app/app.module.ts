import { DeploysModule } from './deploys/deploys.module';
import { ApplicationsModule } from './applications/applications.module';
import { AppMaterialModule } from './app-material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppMaterialModule,
    AppRoutingModule,
    ApplicationsModule,
    DeploysModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
