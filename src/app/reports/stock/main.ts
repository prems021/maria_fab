import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';
import { DataService } from '../../services/data.service';
import { UpdateService } from '../../services/update.service';
import { p_model } from './model';
import {ExcelService} from '../../services/excel.service';
@Component({
  selector: 'stock-list',
  templateUrl: './main.html',
  styleUrls: ['./main.css']
})
export class ListStock implements OnInit {
 

   arrayOfKeyValues: any[] = [];
   isclicked : boolean= false;
   avil_qty : any;
   view : boolean = false;
   product_array : p_model [] = [];

  constructor(private fb: FormBuilder, private router: Router , private ds: DataService , private us : UpdateService,private es: ExcelService) {   }
  ngOnInit()  {
                    this.get_lists();
     
   

              }
  
  exportAsXLSX():void {
    this.es.exportAsExcelFile(this.product_array, 'stock');
  }


get_lists()
{
  
  console.log('jst');
    
  this.us.list_stocks()
 .subscribe((jsonData) => { this.getjson2(jsonData)
                      },(err) => console.error(err),
                      
                      );
}
  

  

      getjson2(json :any)
  {
    console.log('jst',json);
    this.view = true;
this.product_array = json;
console.log(this.product_array);
   
  }



 print_report()
{
  window.print();
}
 
   
  }

