import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { UiModule } from './ui/ui.module';

import { LookupService } from './ui/lookup/lookup.service';
import { AppRoutingModule } from './/app-routing.module';

import { SharedService } from './shared.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    UiModule,
    AppRoutingModule
  ],
  providers: [ LookupService, SharedService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
