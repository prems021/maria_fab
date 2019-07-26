import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import  { SharingService } from '../../services/sharing.service';

import { Router } from '@angular/router';
import  { cash_model } from './model'

@Component({
  selector: 'app-payment-bill',
  templateUrl: './main.html',
  styleUrls: ['./main.css']
})
export class PaymentComponentsonbills implements OnInit {

arrayOfCusValues : any [] = [];
pay_options = ['Cash','Cheque'];
cheque_flag : boolean = false;
date_change_flag : number = 0;
date_c_change_flag : number = 0;
cash_date : string = '';
Cheque_Date : string = '';
pay_op : string = 'Cash';
cash__model = new cash_model(0,'','','',0,0,'','',null,0,false,false,0);
print_flag : boolean = false;
reciept_number : number = 0;

isClickedOnce : boolean = false;
onsucc : number = 0;
custoo : any ;
today: number = Date.now();
ser_res : boolean = false
ser_res2 : boolean = false
fig_main : string = '';
selectedOption : string = 'Cash'
fig_model : any = {number_to_convert : 0, msg:'hi'}
     constructor(private router: Router,private ds: DataService, private ss: SharingService) {
    
     
    
  }
  

  ngOnInit() {

  
  if(this.ss.i_m.flags[0].IS_PAYMENT_ON_BILL === true)
  {
     this.get_reciept_no()
    this.cash__model.cus_name = this.ss.i_m.heads[0].CUSTOMER_NAME;
    this.cash__model.cus_street = this.ss.i_m.heads[0].CUSTOMER_STREET;
    this.cash__model.amount_payed = this.ss.i_m.tails[0].TOTAL_PAID_TODAY;
    this.cash__model.cash_date = this.ss.i_m.heads[0].BILL_DATE;
    this.cash__model.is_reciept  = true
    this.cash__model.is_cash_pay = true

    if(this.ss.i_m.configs[0].IS_ON_UPDATE === false)

    {
      this.cash__model.due_balance = this.ss.i_m.heads[0].CUS_DUE + this.ss.i_m.tails[0].GRAND_TOTAL;
    }

   else

   {
      this.cash__model.due_balance = this.ss.i_m.heads[0].CUS_DUE  +  this.ss.i_m.tails[0].GRAND_TOTAL_DIFF
   }
    
    
    this.cash_date = this.ss.i_m.heads[0].BILL_DATE;

    this.date_change_flag = 2

    this.cash__model.balance_amt = this.cash__model.due_balance - this.cash__model.amount_payed

    this.make_figure()
  }

  else
  {
  

  }

   
  }











get_reciept_no()
{

 this.ds.get_reciept_number_b2b().subscribe((jsonData) => { this.getval2(jsonData)  
                      },(err) => console.error(err),
                       
                      );

}

getval2(s:any)
{

 
 
  this.reciept_number = s.count + 1;
  this.ser_res = true;
  
}



  get_customers()

{
   this.ds.get_customers_list_b2b()
  .subscribe((jsonData) => { this.get_customer_res(jsonData)
                      },(err) => console.error(err),
                       
                      );
}
get_customer_res(json:any)
{ 
  this.arrayOfCusValues = json;
}



  onChange_option(option)
{
   if(option === 'Cheque')
   {
      this.cheque_flag = true;
      this.cash__model.is_cash_pay = false
   }
   else
   {
     this.cheque_flag = false;
     this.cash__model.is_cash_pay = true
   }

 }

  catch_invoice_date(date: any)
 {
    this.date_change_flag = 2
    console.log(date);
    this.cash_date = date._validSelected;
    this.cash__model.cash_date = date._validSelected;
    // this.cash_model.cash_date = this.cash_date;
 }

 catch_chek_date(c_date:any)
 {
   this.date_c_change_flag = 2
      this.Cheque_Date = c_date._validSelected;
     this.cash__model.cheque_Date = this.Cheque_Date;

 }

change_c_date()
{
	this.date_c_change_flag = 0;

}

change_cash_date()
{
	this.date_change_flag = 0;

}


make_figure()
{
 
this.fig_model.number_to_convert = this.cash__model.amount_payed

  this.ds.get_figure(this.fig_model)
  .subscribe((jsonData) => { this.get_fig_json(jsonData)
                     },(err) => console.error(err),
                      
                     );

}





get_fig_json(json:any)
{
  this.fig_main = json.msg;
}


cash_reciept()
{
	console.log('vvv',this.cash__model)


     if (this.cash__model.amount_payed <= 0)
     {

       alert ('Wrong Amount Payed')
     }

    else if (this.cash__model.is_cash_pay == false && this.cash__model.cheque_Date == '')
    {
    alert ('Enter Cheque Date')
    }
    else
    {
       if(this.cash__model.cash_date == '')
       {
         alert ('Enter Transaction Date')
       }

       else
       {
             this.print_flag = true
             this.isClickedOnce =true;
    
      
      this.cash__model.rec_number = this.reciept_number;
       
      this.ds.post_cash_reciept_on_bill(this.cash__model)
      .subscribe((jsonData) => { this.getval3(jsonData)  
                          },(err) => console.error(err),
                          
                          );

       }

      } 
    

   }
   
  
 
   
 getval3(s:any)
 {
   console.log(s);

   this.print_flag = true
 
    if( s.msg === 'Successfully saved')
    {
      
      this.onsucc = 1;
       alert(s.msg);
       window.print();
       this.router.navigate(['/dash']);

    }
  else
  {
    alert(s.msg);
  }
  
 }




}
