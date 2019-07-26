import { Injectable } from '@angular/core';
import { Http, Headers, Response,RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { contentHeaders } from './headers' ;
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ReportService {

    total = 0;
    invo_number : number = 0;
    to_date : string = '';
    from_date : string = '';
  

    
    constructor(private http: Http) { }

    

    
 


    private handleError(error: any): Promise<any> 
  {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
