import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {IdentityInfo} from '../shared/shared';

@Injectable()
export class IdentityInfoService {
  public info: IdentityInfo;

  constructor(private http:HttpClient) { }

  public load() {
   // let url = 'https://localhost:44396/api/identity-info';
    let url = '/api/identity-info';
    return new Promise((resolve, reject) => {
      this.http.get<IdentityInfo>(url)
        
        // .catch((error: any): any => {
        //   console.log('Configuration endpoint could not be read');
        //   resolve(true);
        //   return Observable.throw(error.json().error || 'Server error');
        // })
        .subscribe((response) => {
          console.log('****GOT A RESPONSE:', response);
          this.info = response;
          resolve(true);
        });
    });
  }
}
