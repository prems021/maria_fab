

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';
import { DataService } from '../../services/data.service';
import { UpdateService } from '../../services/update.service';
import { ReportService } from '../../services/report.service';
import {ExcelService} from '../../services/excel.service';


@Component({
  selector: 'purchase-report',
  templateUrl: './main.html',
  styleUrls: ['./main.css']
})
export class Purchase_report implements OnInit {
 

   arrayOfKeyValues: any[] = [];
   isclicked : boolean= false;
   avil_qty : any;
   view : boolean = false;
   loop : number = 0;
   to_amt : number = 0;
   product_array : any [] = [];
   to_date : string;
   from_date : string;
        dateForm = this.fb.group({                  
                                                  
                                                  from_date : '1987-09-10',
                                                  to_date: '2055-08-09',
                                                  option : 2
                                                 
                                              
                                         });


  constructor(private fb: FormBuilder, private router: Router ,private Rs: ReportService,private es: ExcelService,
   private ds: DataService , private us : UpdateService) {   }
  ngOnInit()  {
                   
     
                     this.get_report();

              }
  
get_report()
{
    this.from_date = this.Rs.from_date ;
    this.to_date = this.Rs.to_date;
    this.dateForm.patchValue({from_date:  this.from_date, to_date: this.to_date })

    
    this.ds.get_report_purchase(this.dateForm.value)
       .subscribe((jsonData) => { this.getjson(jsonData)
                      },(err) => console.error(err),
                      
                      );

 } 
    exportAsXLSX():void {
    this.es.exportAsExcelFile(this.product_array, 'purchase');
  }


      getjson(json :any)

  {
    console.log('js',json);
    this.view = true;
this.product_array = json;
console.log(this.product_array);
 this.to_amt = 0;
 for (this.loop = 0; this.loop<this.product_array.length;this.loop++)
 {

   this.to_amt = (this.to_amt-0) + (this.product_array[this.loop].TOTAL_AMOUNT-0);
 }
   
  }


print_report()
{
  window.print();
}
 
 
   
  }

