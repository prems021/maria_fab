import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuard } from '../services/auth.guard';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { SharingService } from '../services/sharing.service';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.html',
  styleUrls: ['./dash.css']
})
export class DashComponent  {
  
 b : number = 0;
 ngOnInit() {
  this.create_ss()
  }
  constructor(private ag : AuthGuard,private _formBuilder: FormBuilder,private router: Router,private ss : SharingService ) { }
  
 
  getval3(x:any)
  {
  
    if (x === 'Backup completed')
    {
      alert('Backup Completed')
    }
    else
    {
      alert(x);
    }
  }
   logout()
  {
    this.ag.token=false;
  }



  create_ss()
   {



if(this.ss.i_m.heads.length === 0)
{

    this.ss.i_m.heads.push({

      INVOICE_NUMBER: null,
      INVOICE_STRING: null,
      BILL_DATE : new Date().toDateString(),
      CUSTOMER_NAME: null,
      CUSTOMER_CITY : null,
      CUSTOMER_STREET : null,
      CUSTOMER_GST_IN : null,
      CUSTOMER_PHONE : null,
      CUSTOMER_PAN : null,
      CUSTOMER_PHONE2 : null,
      TRANS_MODE : null,
      VEH_NO : null,
      PLACE_SUPPLY : null,
      BUNDLES : null,
      LPO : null,
      DN : null,
      CUS_DUE : 0
  })
 
  this.ss.i_m.tails.push({
 
 
     TOTAL_PAID_TODAY : 0,
     TOTAL_PRE_PAID : 0,
     SUB_TOTAL : 0,
     TOTAL_TAX : 0,
     TOTAL_CESS : 0,
     GRAND_TOTAL : 0,
     OLD_GRAND_TOTAL : 0,
     GRAND_TOTAL_DIFF :0,
     TOTAL_DUE : 0,
     OLD_DUE : 0
 
 })
 
 
 this.ss.i_m.configs.push({
 
     ITEM_LENGTH : 0,
     ITEM_OLD_LENGTH : 0,
     IS_B2B : false,
     IS_PARTIAL_PAY : true,
     IS_DEL_POSSIBLE : true ,
     IS_ON_UPDATE : false ,
     ACTIVE_TAX_COUNT : 0
 
 
 })
 
 this.ss.i_m.flags.push({
 
     IS_INVO_NUMBER_LOADED : false,
     DATE_CHANGE_FLAG : 0,
     IS_SERVER_RES : false,
     CHANGE_OVER_FLAG : false,
     IS_PAYMENT_ON_BILL : false,
     IS_PAYMENT_ON_UPDATE : false

 
 
 })

 this.ss.i_m.items.push({ "SI_NO":1, DESCRIPTION:'',HSN_CODE:'',ARTICLE_CODE:'',BRAND_NAME:'',SPECIFICATION:'',CATEGORY:'',"QTY":1,"TAX":0,
 "PRICE":0,"UNIT":"pc","NET_PRICE":0,"RATE_SUM":0,ITEM_SUM:0,IS_RETURN:false })



 this.ss.i_m.varibs.push({
 
  I : -1,
  K : -1,
  Z : -1


})
}

else
{
  this.reset_heads()
}

this.ss.i_m.configs[0].IS_ON_UPDATE = false;
   }






   reset_heads()
   {
     this.ss.i_m.configs.pop();
     this.ss.i_m.flags.pop();
     this.ss.i_m.heads.pop();
     this.ss.i_m.tails.pop();
     this.ss.i_m.varibs.pop();
     for (this.b = this.ss.i_m.items.length ; this.b > 0 ; this.b--)
     {
        this.ss.i_m.items.pop();
       
     }

     this.create_ss();




   }





  update_customer()
  {
  
   this.router.navigate(['/update-customer']);

  }

 


    add_member()
    {
       this.router.navigate(['/add_product']);

    }

    add_party()
    {
      this.router.navigate(['/add_party']);
    }
  add_reciept()
  {
   this.router.navigate(['/invoice_reciept']);

  }
  exp_detail_entry()
  {

     this.router.navigate(['/exp_det']);

  }
 go_report()
  {
   this.router.navigate(['/estimate']);

  }
  all_invo()

  {
       this.router.navigate(['/invoice_all']);
  }

  add_cus()

  {
     this.router.navigate(['/add_customer']);
  }

  add_exp_cat()
  {

this.router.navigate(['/add_exp_cat']);

  }
  
  add_exp_entry()
  {
    this.router.navigate(['/add_exp_entry']);
  }

  go_estimate()
  {
     this.router.navigate(['/estimate_reciept']);
  }

estimate_list()
{
  this.router.navigate(['/estimate_list']);
}

update_product()
{
  this.router.navigate(['/update_product']);
}

b2c()
{

this.router.navigate(['/b2c-invoice']);
  
}

all_invo_b2b()
{
  this.router.navigate(['/b2b-all-invo']);
}

cash_recieve()
{
  
  this.router.navigate(['/cash-recieve']);
  
}
customer_statement()
{
  this.router.navigate(['/customer-statement']);
}


}