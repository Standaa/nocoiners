import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, NgModel } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { debounceTime, mergeMap, tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { LookupService } from './lookup.service';

import { SharedService } from '../../shared.service';

@Component({
  selector: 'app-lookup',
  templateUrl: './lookup.component.html',
  styleUrls: ['./lookup.component.css']
})
export class LookupComponent implements OnInit {

  isLoading = false;
  isDomainTaken: boolean;
  isRegisteringAllowed = false;

  title = 'app';
  form = new FormControl();

  constructor (
    private router: Router,
    private lookupService: LookupService,
    private sharedService: SharedService
  ) {}

  ngOnInit() { 
    this.configureSearchForm();
  }

  configureSearchForm () {
    this.form.valueChanges.pipe(
      tap((term) => {
        this.isDomainTaken = undefined;
        if (term) {
          this.isLoading = true;
        } else {
          this.isLoading = false;
        }
      }),
      debounceTime(200),
      mergeMap(term => {  
        if (term) {
          return this.lookupService.addressLookup(term);
        } else {          
          this.isDomainTaken = undefined;
          return of(term);
        }  
      })
      ).subscribe((result) => {        
        this.isLoading = false;
        if (result) {
          this.isRegisteringAllowed = false;
          this.isDomainTaken = true;
        } else if (result === "") {
          this.isRegisteringAllowed = false;
          this.isDomainTaken = undefined;
        } else {          
          this.isRegisteringAllowed = true;
          this.isDomainTaken = false;
        }
        
      });
  }

  triggerWalletCreationFlow() {    
    this.lookupService.createWallet().subscribe(data => {      
      this.sharedService.setWalletData(data);      
    });
    this.lookupService.deployENSDebtContract().subscribe(data => {
      console.log("TRANSACTION DATA", data);
      this.router.navigate(['/wallet']);
    });
  }

}
