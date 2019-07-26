import { Component,OnInit } from '@angular/core';
import {  UpdateService } from '../../services/update.service';
import {  ReportService } from '../../services/report.service';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup,FormControl, Validators} from '@angular/forms';

 import { list } from './model';
 import  { cashes } from './model';


@Component({
    selector: 'cus-state-report',
    templateUrl: './main.html',
    styleUrls: ['./main.css']
})
export class Customer_statement {
  
 
    arrayOfCusValues : any[] =[];
    data : any [] =[];
   // post_invo = new items(1,[]);
    total_sub_total : number = 0;
    total_tax : number =0 ;
    items = [];
    itemCount = 0;
    to_date : string;
    from_date : string;
    view : boolean = false;
    length : number = 0;
    total_grand : number =0;
    clicked : number = 0;
    main_index : number = 0;
    disp : number = 0;

     master_model = new list(1,[])
     slave_model = new cashes(1,[]);
    Total_amt_all : number = 0;
    Total_payed_all : number = 0;
    Total_due_all : number = 0;
     bool : boolean ;
     si : number = 0;
     j :number = 0;
     index : number = 0;
     cus_name : string = '';
     cus_city : string = '';
     cus_gst : string ='';

     slaveForm = this.fb.group({
     
       invoice_number : '',
       is_b2b : '',
       cus_gst : ''


     });
       stateForm = this.fb.group({                  
                                                  
                                                  from_date : '',
                                                  to_date: '',
                                                  cus_name: '',
                                                  cus_street:'',
                                                  city:'',
                                                  gstin:'',
                                                  option : 2
                                                 
                                              
                                         });

    constructor( private fb: FormBuilder, private ds : DataService, private uS: UpdateService, private rs: Router ,private Rs: ReportService ) {
       
    }
ngOnInit() {
   
 //  this.get_reports();
    this.from_date = this.Rs.from_date ;
    this.to_date = this.Rs.to_date;
    this.stateForm.patchValue({from_date:  this.from_date, to_date: this.to_date })
    this.get_customers();
    this.index = 0 ;
   
  }

// print_re()
// {
//   window.print();
// }
cus_blur(xx:any)
{

 let s : any; 

s = this.arrayOfCusValues.filter(xi=> xi.CUSTOMER_NAME === xx);
this.stateForm.patchValue({cus_name :s[0].CUSTOMER_NAME }) ;
this.stateForm.patchValue({cus_street :s[0].STREET }) ;
this.stateForm.patchValue({city :s[0].CITY }) ;
this.stateForm.patchValue({gstin :s[0].GSTIN }) ;

this.cus_name = s[0].CUSTOMER_NAME;
this.cus_city = s[0].CITY
this.cus_gst = s[0].GSTIN;



}


 get_customers()
{
  
  this.ds.get_customers_list_b2b()
  .subscribe((jsonData) => { this.getjson5(jsonData)
                      },(err) => console.error(err),
                    
                      );
}
getjson5(json :any)
  {
    
  this.arrayOfCusValues = json;
   
  
   
}


generate_report()
 {
   this.disp = 1 ;
   this.clicked = this.clicked + 1;
   
this.ds.get_master_cus_report(this.stateForm.value)
.subscribe((jsonData) => { this.getjson15(jsonData)
                      },(err) => console.error(err),
                    
                      );
 this.ds.get_cus_slave_report(this.stateForm.value)
       .subscribe((jsonData) => { this.getslave(jsonData)
                      },(err) => console.error(err),
                      
                      );
 }


getjson15(mas: any)
{
  
  console.log('mas',mas)
   for(var i = 0; i < mas.length ; i++)
       {
  this.push_master();
  this.master_model.item[i].SI = i +  1 ;
  this.master_model.item[i].BILL_DATE = mas[i].BILL_DATE;
  this.master_model.item[i].INVOICE_NUMBER = mas[i].INVOICE_NUMBER;
  this.master_model.item[i].ITEM_LENGTH = mas[i].ITEM_LENGTH;
  this.master_model.item[i].SUB_TOTAL = mas[i].SUB_TOTAL
  this.master_model.item[i].TAX_COLLECTED = mas[i].TAX_COLLECTED;
  this.master_model.item[i].GRAND_TOTAL = mas[i].GRAND_TOTAL

  
  this.total_sub_total = (this.total_sub_total-0) + (mas[i].GRAND_TOTAL-0)
  

  this.total_tax = (this.total_tax-0) + (mas[i].TAX_COLLECTED-0);

      }
 
   this.view = true;

}




  getslave(s:any)
  {
     console.log('slave',s)
     
     for(var m = 0; m < s.length ; m++)
       {
          this.sub_push()
          this.slave_model.item[m].RECIEPT_NO = s[m].RECIEPT_NO
          this.slave_model.item[m].CASH_DATE = s[m].CASH_DATE
          this.slave_model.item[m].AMOUNT_PAYED = s[m].AMOUNT_PAYED
          this.slave_model.item[m].AMOUNT_DUE = s[m].AMOUNT_DUE
          this.Total_payed_all = (this.Total_payed_all-0) + (s[m].AMOUNT_PAYED-0)
           if (s[m].IS_CASH_PAY == true)
          {
            this.slave_model.item[m].IS_CASH_PAY = 'CASH'

          }
          else
          {
            this.slave_model.item[m].IS_CASH_PAY = 'CHEQUE'
            this.slave_model.item[m].BANK_NAME = s[m].BANK_NAME

            this.slave_model.item[m].CHEQUE_DATE = s[m].CHEQUE_DATE
            this.slave_model.item[m].CHEQUE_NO = s[m].CHEQUE_NO

          }
          
       }  
       
    
     
  }

  print_report()
  {
    window.print()
  }

 push_master()
 {
   this.master_model.item.push({"SI": 1, "INVOICE_NUMBER": 1,"BILL_DATE":'',"ITEM_LENGTH":0,"SUB_TOTAL":0,
     "TAX_COLLECTED":0, "GRAND_TOTAL":0});
 }

 sub_push()
 {
  this.slave_model.item.push({"SI": 1,"RECIEPT_NO":1,"CASH_DATE":"","IS_CASH_PAY":"CASH","AMOUNT_PAYED":0,

    "AMOUNT_DUE":0,"CHEQUE_NO":null,"CHEQUE_DATE":"","BANK_NAME":""});
 }

}