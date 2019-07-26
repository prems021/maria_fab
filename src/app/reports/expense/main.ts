

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';
import { DataService } from '../../services/data.service';
import { UpdateService } from '../../services/update.service';
import { ReportService } from '../../services/report.service';
import { ExcelService } from '../../services/excel.service';


@Component({
  selector: 'revenue-report',
  templateUrl: './main.html',
  styleUrls: ['./main.css']
})
export class Expense_report implements OnInit {
 

   arrayOfKeyValues: any[] = [];
   isclicked : boolean= false;
   avil_qty : any;
   view : boolean = false;
   product_array : any [] = [];
   to_date : string;
   from_date : string;
   cats : any[] = ['All'];
   cta_name : string = 'All';
   total_amount : number = 0;
        dateForm = this.fb.group({                  
                                                  
                                                  from_date : '',
                                                  to_date: '',
                                                  option : 2,
                                                  cat : 'All'
                                                 
                                              
                                         });


  constructor(private fb: FormBuilder, private router: Router ,private Rs: ReportService,private es: ExcelService,
   private ds: DataService , private us : UpdateService) {   }
  ngOnInit()  {
                   
                     this.get_expence_cats();
                     

              }
  
option_change(cc:any)
{
  this.dateForm.patchValue({cat:cc})
  this.cta_name = cc
}
  exportAsXLSX():void {
    this.es.exportAsExcelFile(this.product_array, 'expense');
  }

get_expence_cats()
{
  this.ds.get_exp_type_list()
       .subscribe((jsonData) => { this.getjson_cats(jsonData)
                      },(err) => console.error(err),
                      
                      );

}


search_report()
{

  this.get_report();
}

getjson_cats(json:any)
{
   console.log('catogorrryyy..',json);

    for( var i = 0 ; i < json.length; i++)
  this.cats[i+1] = json[i].CATEGORY_NAME;
}

get_report()
{
    this.from_date = this.Rs.from_date ;
    this.to_date = this.Rs.to_date ;
    this.dateForm.patchValue({from_date:  this.from_date, to_date: this.to_date })
   
   console.log('form',this.dateForm.value);
    
    this.ds.get_report_expense(this.dateForm.value)
       .subscribe((jsonData) => { this.getjson(jsonData)
                      },(err) => console.error(err),
                      
                      );

 } 
  

      getjson(json :any)

  {
    console.log('js',json);
    this.view = true;
this.product_array = json;
console.log(this.product_array);
   
     for(var loop =0; loop<this.product_array.length; loop++)
     {
       this.total_amount = (this.total_amount-0) + (this.product_array[loop].TOTAL_AMOUNT-0)
     }

  }


print_report()
{
  window.print();
}
 
 
   
  }

