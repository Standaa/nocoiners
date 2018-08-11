import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, NgModel } from '@angular/forms';
import { debounceTime, mergeMap, tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit { // implements OnInit 

  isLoading = false;
  isDomainTaken: boolean;

  title = 'app';
  form = new FormControl();

  constructor (
    private appService: AppService
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
          console.log('Nothing');  
          this.isLoading = false;
        }                            
      }),
      debounceTime(200),
      mergeMap(term => {        
        if (term) {
          return this.appService.addressLookup(term);
        } else {
          return of(undefined);
        }  
      })
      ).subscribe(result => {
        console.log('result', result);
        this.isLoading = false;
        if (result) {
          this.isDomainTaken = true;
        } else {
          this.isDomainTaken = false;
        }
        
      });
  }

  

}
