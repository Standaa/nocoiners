import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { from } from 'rxjs/observable/from';
import { filter } from 'rxjs/operators';


@Injectable()
export class SharedService {
    
  walletData: Object;

  constructor() {}

  setWalletData (data) {    
    this.walletData = data;
  }

  getWalletData () {    
    return this.walletData;
  }

}
