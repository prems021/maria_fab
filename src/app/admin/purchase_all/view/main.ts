import { Component,OnInit,TemplateRef, ViewChild  } from '@angular/core';

import {  UpdateService } from '../../../services/update.service';
import { DataService } from '../../../services/data.service';
import { SharingService } from '../../../services/sharing.service';
import { invoices } from './model';
import { columns, Company, data } from './assets';
import { Columns } from 'ngx-easy-table';
import { ConfigService } from './config';

import { Router } from '@angular/router';
@Component({
    selector: 'purchase-all',
    templateUrl: './main.html',
    styleUrls: ['./main.css'],
   
})
export class Purchase_all {
    @ViewChild('detailsTemplate') detailsTemplateRef: TemplateRef<any>;
  columns: Columns[] = [];
  data: Company[] = [];

  configuration;
 
  clicked : number = 0;
  clicked2 : string = '';
  clicked3 : number = 0;
  clicked4 : number = 0;
  clicked5 : string = '';

  view : boolean = false;
  mos : any = {"invo_string":''};

 constructor( private ds : DataService, private uS: UpdateService, private rs: Router, private ss: SharingService  )
 {
       this.configuration = ConfigService.config;
   // this.data = data;
    this.columns = columns;
 }
  
  ngOnInit() {
   
   
   this.get_purchases();
       
  }

 get_purchases()
  {
    this.ds.get_purchases()
       .subscribe((jsonData) => { this.getjson(jsonData)
                      },(err) => console.error(err),
                      
                      );

  }



  getjson(s:any)
  {
    console.log(s);
    this.ss.i_m.tails[0].TOTAL_PRE_PAID = s[0].IGST
    this.ss.i_m.tails[0].TOTAL_PAID_TODAY = s[0].CGST
    this.ss.i_m.tails[0].TOTAL_DUE = s[0].SGST
     this.data = s;
     this.view = true;
  }

   eventEmitted($event) {

     

     if($event.event == 'onSearch')
     {
         
     }
     else
     {
        this.clicked = $event.value.row.EXPENCE_ENTRY_NO;
        this.clicked2 = $event.value.row.VENDOR;
        this.clicked3 = $event.value.row.BILL_NO;
        this.clicked4 = $event.value.row.TOTAL_AMOUNT;
        this.clicked5 = $event.value.row.EXP_DATE
      alert("Selected Invoice Number  " + this.clicked);
         
          
           this.ss.i_m.heads[0].INVOICE_NUMBER = this.clicked;
           this.ss.i_m.heads[0].CUSTOMER_NAME =  this.clicked2
           this.ss.i_m.heads[0].CUSTOMER_STREET = $event.value.row.STREET
           this.ss.i_m.heads[0].CUSTOMER_GST_IN = $event.value.row.CUS_GST
           this.ss.i_m.tails[0].TOTAL_CESS =  this.clicked3
           this.ss.i_m.tails[0].GRAND_TOTAL = this.clicked4
           this.ss.i_m.heads[0].BILL_DATE = this.clicked5

          this.rs.navigate(['/purchase_details']);

     }


   

   


 
  }

   
}