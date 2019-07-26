

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';
import { DataService } from '../../services/data.service';
import { UpdateService } from '../../services/update.service';
import { ReportService } from '../../services/report.service';
import { ExcelService } from '../../services/excel.service';

import { p_model } from './model';
@Component({
  selector: 'revenue-report',
  templateUrl: './main.html',
  styleUrls: ['./main.css']
})
export class Revenue_report implements OnInit {
 

   arrayOfKeyValues: any[] = [];
   isclicked : boolean= false;
   avil_qty : any;
   view : boolean = false;
   product_array : any [] = [];
   to_date : string;
   from_date : string;

  total_grand: number = 0;
  total_payed: number = 0;
  total_due: number = 0;
  loop: number =0;

        dateForm = this.fb.group({                  
                                                  
                                                  from_date : '',
                                                  to_date: '',
                                                  option : 2
                                                 
                                              
                                         });


  constructor(private fb: FormBuilder, private router: Router ,private Rs: ReportService,private es: ExcelService,
   private ds: DataService , private us : UpdateService) {   }
  ngOnInit()  {
                   
     
                     this.get_report();

              }

                
  exportAsXLSX():void {
    this.es.exportAsExcelFile(this.product_array, 'Revenue');
  }

  
get_report()
{
    this.from_date = this.Rs.from_date ;
    this.to_date = this.Rs.to_date;
    this.dateForm.patchValue({from_date:  this.from_date, to_date: this.to_date })

    
    this.ds.get_report_revenue(this.dateForm.value)
       .subscribe((jsonData) => { this.getjson(jsonData)
                      },(err) => console.error(err),
                      
                      );

 } 
  

      getjson(json :any)

  {
    console.log('js',json);
    this.view = true;
this.product_array = json;

   for(this.loop = 0; this.loop<this.product_array.length; this.loop++)
   {

    this.total_grand = (this.total_grand-0) + (this.product_array[this.loop].GRAND_TOTAL-0)
     this.total_payed = (this.total_payed-0) + (this.product_array[this.loop].TOTAL_PAYED-0)
     this.total_due = (this.total_due-0) + (this.product_array[this.loop].TOTAL_DUE-0)
   }






   
  }


print_report()
{
  window.print();
}
 
   
  }

