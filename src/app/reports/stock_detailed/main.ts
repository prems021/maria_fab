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
export class ListStock_details implements OnInit {
 

   arrayOfKeyValues: any[] = [];
   isclicked : boolean= false;
   avil_qty : any;
   view : boolean = false;
   product_array = new p_model(1,[]);
   tot_pur_val : number = 0;
   tot_sal_val : number = 0;
   total_stock_item : number = 0 ;

  constructor(private fb: FormBuilder, private router: Router , private ds: DataService , private us : UpdateService, private es: ExcelService) {   }
  ngOnInit()  {
                    this.get_lists();    
   

              }
  
  exportAsXLSX():void {
    this.es.exportAsExcelFile(this.product_array.ITEMS, 'stock_details');
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
    
// this.product_array = json;
this.tot_pur_val = 0;
this.tot_sal_val = 0;
this.total_stock_item = 0;

for (var i = 0; i < json.length;i++)
 {
     this.push_arr(); 
  
     this.product_array.ITEMS[i].DESCRIPTION = json[i].DESCRIPTION
    this.product_array.ITEMS[i].HSN_CODE = json[i].HSN_CODE
     this.product_array.ITEMS[i].AVAIL_QTY = json[i].AVAIL_QTY
     this.product_array.ITEMS[i].PURCHASE_VALUE = json[i].PUR_PRICE * json[i].AVAIL_QTY
     this.product_array.ITEMS[i].SALES_VALUE = json[i].NET_PRICE * json[i].AVAIL_QTY

     this.total_stock_item = (this.total_stock_item-0) + (this.product_array.ITEMS[i].AVAIL_QTY-0)
     this.tot_pur_val = (this.tot_pur_val-0) + (this.product_array.ITEMS[i].PURCHASE_VALUE-0) ;
     this.tot_sal_val = (this.tot_sal_val-0) + (this.product_array.ITEMS[i].SALES_VALUE-0);
 }


console.log(this.product_array);
this.view = true;
   
  }

  push_arr()
  {
    this.product_array.ITEMS.push({DESCRIPTION:'',HSN_CODE:'',AVAIL_QTY:0,SALES_VALUE:0,PURCHASE_VALUE:0})
  }



 print_report()
{
  window.print();
}
 
   
  }

