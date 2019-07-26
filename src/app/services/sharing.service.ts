import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { invoices } from './models';

import 'rxjs/add/operator/map'

@Injectable()
export class SharingService {
date_change_flag : number = 0;
is_del_possibe : boolean = false;


i_m = new invoices([],[],[],[],[],[],[],[]) ;  
    constructor(private http: Http) { }

  
  


}