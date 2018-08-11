import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HeaderComponent } from './header/header.component';
import { LayoutComponent } from './layout/layout.component';
import { LookupComponent } from './lookup/lookup.component';
import { WalletComponent } from './wallet/wallet.component';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [HeaderComponent, LayoutComponent, LookupComponent, WalletComponent],
  exports: [LayoutComponent]
})
export class UiModule { }
