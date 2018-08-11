import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { from } from 'rxjs/observable/from';

import * as ethers from 'ethers';

const providers = ethers.providers;
const provider = providers.getDefaultProvider();


@Injectable()
export class AppService {

  constructor(
    private http: Http
  ) {}

  addressLookup(name): Observable<any> {
    console.log('Pass');
    const address = provider.resolveName(`${name}.attwitter.eth`);
    return from(address);
  }

}
