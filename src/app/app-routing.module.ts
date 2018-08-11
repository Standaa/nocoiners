import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { LookupComponent } from './ui/lookup/lookup.component';
import { WalletComponent } from './ui/wallet/wallet.component';

// Route Configuration
const routes: Routes = [
  { path: '', redirectTo: 'register', pathMatch: 'full'},
  { path: 'register', component: LookupComponent },
  { path: 'wallet', component: WalletComponent }  
];

@NgModule({
  imports: [ CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
