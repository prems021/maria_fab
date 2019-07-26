import { Component,OnInit } from '@angular/core';
import {  UpdateService } from '../../services/update.service';
import {  ReportService } from '../../services/report.service';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup,FormControl, Validators} from '@angular/forms';
import {ExcelService} from '../../services/excel.service';

import { list } from './model';
import  { cashes } from './model';
 import { credit_debit } from './model';


@Component({
    selector: 'cus-state-report',
    templateUrl: './main.html',
    styleUrls: ['./main.css']
})
export class Customer_cr_deb_statement {
  
 
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

    cr_dr_model = new credit_debit(1,[]);

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
     credit_bal : number =0;
     pii : number = 0;

     mariane_total : number =0;

     total_cash_amy : number = 0;

     total_bill_amt : number = 0;

     slaveForm = this.fb.group({
     
       invoice_number : '',
       is_b2b : '',
       cus_gst : ''


     });
       stateForm = this.fb.group({                  
                                                  
                                                  from_date : '1987-09-10',
                                                  to_date: '2055-08-09',
                                                  customer_name: '',
                                                  street:'',
                                                  city:'',
                                                  gstin:'',
                                                  option : 2
                                                 
                                              
                                         });

    constructor(private es: ExcelService, private fb: FormBuilder, private ds : DataService, private uS: UpdateService, private rs: Router ,private Rs: ReportService ) {
       
    }
ngOnInit() {
   
 //  this.get_reports();
    this.from_date = this.Rs.from_date ;
    this.to_date = this.Rs.to_date;
    this.stateForm.patchValue({from_date:  this.from_date, to_date: this.to_date })
    this.get_customers();
    this.index = 0 ;
   
  }

  exportAsXLSX():void {
    this.es.exportAsExcelFile(this.cr_dr_model.item, 'credit_debit');

            }

print_re()
{
  window.print();
}
cus_blur(xx:any)
{

 let s : any; 

s = this.arrayOfCusValues.filter(xi=> xi.CUSTOMER_NAME === xx);
this.stateForm.patchValue({customer_name :s[0].CUSTOMER_NAME }) ;
this.stateForm.patchValue({street :s[0].STREET }) ;
this.stateForm.patchValue({city :s[0].CITY }) ;
 this.credit_bal = s[0].OPENING_BALANCE;
this.stateForm.patchValue({gstin :s[0].GSTIN }) ;

this.cus_name = s[0].CUSTOMER_NAME;
this.cus_city = s[0].CITY
this.cus_gst = s[0].GSTIN;



}


 get_customers()
{
  
  this.ds.get_customer_only_list()
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
   
     console.log('sf',this.stateForm);
      
        this.ds.get_cus_cr_report(this.stateForm.value)
       .subscribe((jsonData) => { this.get_check(jsonData)
                      },(err) => console.error(err),
                      
                      );
 }

get_check(xx:any)
{

  console.log('data',xx)

this.push_cr_dr();


this.cr_dr_model.item[0].BALANCE = this.credit_bal;
this.cr_dr_model.item[0].SI =  1 ;
this.cr_dr_model.item[0].DATE = this.from_date ;
this.cr_dr_model.item[0].PARTICULAR = 'To OPENING BALANCE';
this.cr_dr_model.item[0].VOUCH_TYPE = 'OPENING BALANCE';
this.cr_dr_model.item[0].DEBIT =  this.credit_bal;
this.cr_dr_model.item[0].VOUCH_NO = null
this.cr_dr_model.item[0].CREDIT = null


  for(var i = 1; i <= xx.bills.length ; i++)
  {
     this.push_cr_dr();

  this.cr_dr_model.item[i].SI = i +  1 ;
  this.cr_dr_model.item[i].DATE = xx.bills[i-1].BILL_DATE;
  this.cr_dr_model.item[i].PARTICULAR = 'To SALES';
  this.cr_dr_model.item[i].VOUCH_TYPE = 'BILL GST(A)';
  this.cr_dr_model.item[i].VOUCH_NO = xx.bills[i-1].INVOICE_NUMBER;
    this.cr_dr_model.item[i].DEBIT = xx.bills[i-1].GRAND_TOTAL;
    this.total_bill_amt = (this.total_bill_amt-0) + (xx.bills[i-1].GRAND_TOTAL-0);
    this.cr_dr_model.item[i].CREDIT = null



  }

this.pii = 0;
   for(var oo = xx.bills.length ; oo < xx.cash.length+xx.bills.length ; oo++)
   {
     
      this.push_cr_dr();

      this.cr_dr_model.item[oo+1].SI = oo + 2 ;
       this.cr_dr_model.item[oo+1].DATE = xx.cash[this.pii].CASH_DATE;
      this.cr_dr_model.item[oo+1].VOUCH_TYPE = 'Reciept';

    
     console.log('pii',this.pii)
     console.log('oo',oo)

    this.cr_dr_model.item[oo+1].VOUCH_NO = xx.cash[this.pii].RECIEPT_NO;
    this.cr_dr_model.item[oo+1].CREDIT = xx.cash[this.pii].AMOUNT_PAYED;
    this.total_cash_amy = (this.total_cash_amy-0) + (xx.cash[this.pii].AMOUNT_PAYED-0);
      

            if(xx.cash[this.pii].IS_CASH_PAY === false)
  {
    this.cr_dr_model.item[oo+1].PARTICULAR = 'by BANK';
  }
  else
  {
    this.cr_dr_model.item[oo+1].PARTICULAR = 'by CASH';
  }

  
 this.pii++;
 
  
   }


this.mariane_total = (this.credit_bal-0) + (this.total_cash_amy-0) - (this.total_bill_amt-0)
this.cr_dr_model.item[0].BALANCE = this.mariane_total;
this.cr_dr_model.item[0].DEBIT = this.mariane_total;


console.log('bal____ooi',xx.bills.length )
   for(var op = 1; op < xx.bills.length+1 ; op++)
   {
             console.log('bal____')
          this.cr_dr_model.item[op].BALANCE = (this.cr_dr_model.item[op-1].BALANCE-0) +  (this.cr_dr_model.item[op].DEBIT-0) 

    }

       for(var opp = xx.bills.length+1; opp <= xx.bills.length+xx.cash.length ; opp++)
   {
             console.log('bal____')
          this.cr_dr_model.item[opp].BALANCE = (this.cr_dr_model.item[opp-1].BALANCE-0) -  (this.cr_dr_model.item[opp].CREDIT-0) 

    }


   this.view = true;

}




 
       


calcu_all()
{
   

}

 push_cr_dr()
 {
   this.cr_dr_model.item.push({SI : 0,DATE : '',PARTICULAR : '',VOUCH_TYPE : '',VOUCH_NO : 0,DEBIT : 0,
    CREDIT : 0,BALANCE : 0})
 }


 

}