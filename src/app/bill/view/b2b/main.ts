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
    selector: 'invoice-all',
    templateUrl: './main.html',
    styleUrls: ['./main.css'],
   
})
export class Invoiceall_b2b {
    @ViewChild('detailsTemplate') detailsTemplateRef: TemplateRef<any>;
  columns: Columns[] = [];
  data: Company[] = [];

  configuration;
 
  clicked : number = 0;
  view : boolean = false;
  mos : any = {"invo_string":''};

 constructor( private ds : DataService, private uS: UpdateService, private rs: Router, private ss: SharingService  )
 {
       this.configuration = ConfigService.config;
   // this.data = data;
    this.columns = columns;
 }
  
  ngOnInit() {
   
   
   this.get_defualt_invo_string();
       
  }
get_defualt_invo_string()
{
      this.ds.get_default_invoice_string()
       .subscribe((jsonData) => { this.getjson_def(jsonData)
                      },(err) => console.error(err),
                      
                      );
}

 get_invoices(str:any)
  {
    this.ds.get_invoices_b2b(str)
       .subscribe((jsonData) => { this.getjson(jsonData)
                      },(err) => console.error(err),
                      
                      );

  }


getjson_def(as:any)
{

  console.log(as);
  this.mos.invo_string = as.STRING_NAME;
  this.get_invoices(this.mos);
}
  getjson(s:any)
  {
    console.log(s);
   this.data = s;
     this.view = true;
  }

   eventEmitted($event) {

     

     if($event.event == 'onSearch')
     {
         
     }
     else
     {
        this.clicked = $event.value.row.INVOICE_NUMBER;
      alert("Selected Invoice Number  " + this.clicked);
         
          
           this.ss.i_m.configs[0].IS_ON_UPDATE = true
           this.ss.i_m.heads[0].INVOICE_NUMBER = this.clicked
           this.ss.i_m.heads[0].INVOICE_STRING  = $event.value.row.INVOICE_STRING;
           this.ss.i_m.configs[0].IS_B2B = true
          this.rs.navigate(['/New']);

     }


   

   


 
  }

   
}