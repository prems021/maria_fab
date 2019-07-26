import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharingService } from '../../../services/sharing.service';
import { DataService } from '../../../services/data.service';
import { i_number } from './model';
import { custo } from './model';

@Component({
  selector: 'app-bill-top-b2b',
  templateUrl: './b2b.html',
  styleUrls: ['./b2b.css']
})
export class B2b_top_Component implements OnInit {

  
  arrayOfCusValues : any[] =[];
  invoice_number_gets = new i_number('',1);

  is_invo_num_loaded : boolean = false;
  dip_invo_number : number;
 invoice_number_b2b : number = 0;
 invoice_number_b2c : number = 0;

 j : number = 0
 d_ : number = 0
 cusstto = new custo('',0,'','',0,false,0,'',0,'','');
 custoo : any
 post_model : any = {invo_string : "",is_b2b:false , invo_number: 0}
  
  
     constructor(private router: Router , private ss : SharingService , private ds : DataService) { }
  

  ngOnInit() {


               if(this.ss.i_m.configs[0].IS_ON_UPDATE === true)
               {
                this.reset_ss()
                this.post_model.is_b2b =  this.ss.i_m.configs[0].IS_B2B
                this.post_model.invo_number =  this.ss.i_m.heads[0].INVOICE_NUMBER
                this.post_model.invo_string =   this.ss.i_m.heads[0].INVOICE_STRING
     
                this.get_master_slave();
               }

               else
               {
                this.ss.i_m.configs[0].IS_B2B = false;
                this.get_def_invo_string();
                
               }
              
               
               this.get_customers();
               
              }

              get_def_invo_string()
              {
                this.ds.get_default_invoice_string()
                .subscribe((jsonData) => { this._get_invo_string(jsonData) 
                  },(err) => console.error(err));
              }
              
              _get_invo_string(json:any)
              {
               
                this.ss.i_m.heads[0].INVOICE_STRING = json.STRING_NAME;
                this.post_model.invo_string = json.STRING_NAME;
              
              
                
                
                 this.get_invo_number_b2c(this.post_model); 
                
                 this.post_model.is_b2b = true;
                 this.get_invo_number_b2b(this.post_model);
              }


              get_invo_number_b2c(invo_string:any)
              {
                 this.ds.get_invo_number_b2c(invo_string).subscribe((jsonData) => { this._get_invo_number_b2c(jsonData)  
                  },(err) => console.error(err),);
              }
              
              get_invo_number_b2b(invo_string:any)
              {
                  this.ds.get_invo_number_b2b(invo_string).subscribe((jsonData) => { this._get_invo_number_b2b(jsonData)  
                   },(err) => console.error(err));
              }

              _get_invo_number_b2c(json:any)
{
   this.ss.i_m.heads[0].INVOICE_NUMBER = json.count + 1;
   this.invoice_number_b2c = json.count + 1;
 
   this.ss.i_m.flags[0].IS_INVO_NUMBER_LOADED = true
}

_get_invo_number_b2b(json:any)
{
 
  this.invoice_number_b2b = json.count + 1;
  this.ss.i_m.flags[0].IS_INVO_NUMBER_LOADED = true

}

             
slide_change(change:any)
{
  
  this.ss.i_m.configs[0].IS_B2B = change.checked;
  if(change.checked === true)
  {
    this.ss.i_m.heads[0].INVOICE_NUMBER = this.invoice_number_b2b;
  }
 else
  {

     this.ss.i_m.heads[0].INVOICE_NUMBER = this.invoice_number_b2c;
  }


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

cus_blur(p:any)
{



if(this.ss.i_m.configs[0].IS_ON_UPDATE === true)
{
  let s : any; 

  s = this.arrayOfCusValues.filter(xi=> xi.CUSTOMER_NAME === this.ss.i_m.heads[0].CUSTOMER_NAME && xi.STREET === this.ss.i_m.heads[0].CUSTOMER_STREET);
  
  console.log('arr cus',s)
  this.cusstto = s[0];
  this.ss.i_m.heads[0].CUS_DUE = s[0].OPENING_BALANCE;

  
  if(s.length != 0)
  {

  }
  
  console.log('ci exist');
  console.log('cus',this.cusstto);
  console.log('cus',this.ss.i_m.heads);

 // this.ss.i_m.heads[0].CUSTOMER_NAME = p

}

else

{

  let s : any; 

s = this.arrayOfCusValues.filter(xi=> xi.CUSTOMER_NAME === p);



if(s.length != 0)
{
this.ss.i_m.heads[0].CUSTOMER_NAME = this.cusstto.CUSTOMER_NAME;
this.ss.i_m.heads[0].CUSTOMER_STREET = this.cusstto.STREET;
this.ss.i_m.heads[0].CUSTOMER_CITY  = this.cusstto.CITY;
this.ss.i_m.heads[0].CUSTOMER_PHONE = this.cusstto.PHONE;
this.ss.i_m.heads[0].CUSTOMER_PHONE2 = this.cusstto.MOBILE;
this.ss.i_m.heads[0].CUSTOMER_GST_IN = this.cusstto.GSTIN;
this.ss.i_m.heads[0].CUS_DUE = this.cusstto.OPENING_BALANCE;

if(this.ss.i_m.heads[0].CUSTOMER_GST_IN != '' && this.ss.i_m.heads[0].CUSTOMER_GST_IN != null )
{
 this.ss.i_m.configs[0].IS_B2B = true;
 this.ss.i_m.heads[0].INVOICE_NUMBER = this.invoice_number_b2b
}
else
{
  this.ss.i_m.configs[0].IS_B2B = false;
  this.ss.i_m.heads[0].INVOICE_NUMBER = this.invoice_number_b2c
}



}

else
{
this.ss.i_m.heads[0].CUSTOMER_NAME  = p;
}

}

}


get_customer_bal_res(json:any)
{
  console.log(json)
}
clear_bill()
{
  var cls = this.ss.i_m.items.length;

  for(var gj=1; gj<cls;gj++)
  {
    this.ss.i_m.items.pop();

  }

  this.ss.i_m.varibs[0].I = -1
  this.ss.i_m.varibs[0].K = 0

  

}




   catch_invoice_date(s:any)
{
  this.ss.i_m.flags[0].DATE_CHANGE_FLAG = 2 ;
  this.ss.i_m.heads[0].BILL_DATE = s._validSelected.toLocaleDateString();
}


 
console()
{
  console.table(this.ss.i_m);
}


change_date()
{
  this.ss.i_m.flags[0].DATE_CHANGE_FLAG = 0
}




reset_ss()
{
 var z = this.ss.i_m.items.length
  while (z > 0) 
  {
     this.ss.i_m.items.pop();
      z--
      
  }
this.ss.i_m.tails[0].SUB_TOTAL = 0;
} 



get_master_slave()
{
  this.ds.get_a_invoice(this.post_model)
  .subscribe((jsonData) => { this._get_a_invoice(jsonData) 
    },(err) => console.error(err));
} 

_get_a_invoice(data : any)
{

  console.log('data',data)
this.make_master(data.master)
this.make_slave(data.slave)


}


make_master(data)
{
  this.ss.i_m.heads[0].BILL_DATE = data.BILL_DATE
  this.ss.i_m.heads[0].BUNDLES = data.BUNDLES
  this.ss.i_m.heads[0].CUSTOMER_CITY = data.CUSTOMER_CITY
  this.ss.i_m.heads[0].CUSTOMER_GST_IN = data.CUSTOMER_GST_IN
  this.ss.i_m.heads[0].CUSTOMER_NAME = data.CUSTOMER_NAME
 
  this.ss.i_m.heads[0].CUSTOMER_PHONE = data.CUSTOMER_PHONE
  this.ss.i_m.heads[0].CUSTOMER_PHONE2 = data.CUSTOMER_PHONE2
  this.ss.i_m.heads[0].CUSTOMER_STREET = data.CUSTOMER_STREET
  this.ss.i_m.heads[0].LPO = data.LPO
  this.ss.i_m.heads[0].DN = data.DN
  this.ss.i_m.heads[0].TRANS_MODE = data.TRANS_MODE
  this.ss.i_m.heads[0].VEH_NO = data.VEH_NO
  this.ss.i_m.heads[0].INVOICE_NUMBER = data.INVOICE_NUMBER
  this.ss.i_m.heads[0].CUSTOMER_PAN = data.PAN_NO

  this.ss.i_m.tails[0].GRAND_TOTAL = data.GRAND_TOTAL
  this.ss.i_m.tails[0].TOTAL_TAX = data.TAX_COLLECTED
  this.ss.i_m.tails[0].SUB_TOTAL = data.SUB_TOTAL
  this.ss.i_m.tails[0].TOTAL_CESS = data.CESS_COLLECTED
  this.ss.i_m.tails[0].TOTAL_DUE = data.TOTAL_DUE
  this.ss.i_m.tails[0].OLD_DUE = data.TOTAL_DUE
  this.ss.i_m.tails[0].TOTAL_PRE_PAID = data.TOTAL_PAYED
  
  this.ss.i_m.tails[0].TOTAL_PAID_TODAY = 0;
 
  this.ss.i_m.configs[0].IS_PARTIAL_PAY = data.IS_PARTIAL_PAY
  this.ss.i_m.configs[0].ITEM_LENGTH = data.ITEM_LENGTH;
  this.ss.i_m.configs[0].ITEM_OLD_LENGTH = data.ITEM_LENGTH;
  this.ss.i_m.varibs[0].I = data.ITEM_LENGTH -  2;
  this.ss.i_m.varibs[0].K = data.ITEM_LENGTH -  2;
  this.ss.i_m.flags[0].IS_INVO_NUMBER_LOADED = true;
  this.ss.i_m.flags[0].DATE_CHANGE_FLAG = 2 ;
  this.ss.i_m.flags[0].CHANGE_OVER_FLAG = true;
  this.ss.i_m.tails[0].OLD_GRAND_TOTAL = data.GRAND_TOTAL;
  this.ss.i_m.tails[0].GRAND_TOTAL_DIFF = 0;
 
}

make_slave(data)
{
  this.push_ss_edit(data.length);
  for(var i=0;i<data.length;i++)
  {

    this.ss.i_m.items[i].DESCRIPTION = data[i].PRODUCT_DESCRIPTION   
     this.ss.i_m.items[i].ARTICLE_CODE = data[i].ARTICLE_CODE   
     this.ss.i_m.items[i].CATEGORY = data[i].CATGERY
    this.ss.i_m.items[i].HSN_CODE = data[i].HSN_CODE
   
    this.ss.i_m.items[i].PRICE = data[i].PRICE
    this.ss.i_m.items[i].QTY = data[i].QUANTITY
    this.ss.i_m.items[i].SI_NO = data[i].SI_NO
    this.ss.i_m.items[i].UNIT = data[i].UNIT
    this.ss.i_m.items[i].TAX = data[i].TAX
    this.ss.i_m.items[i].NET_PRICE = data[i].NET_PRICE

      this.d_ = this.ss.i_m.items[i].NET_PRICE * 100 / (100 + this.ss.i_m.items[i].TAX);

    this.ss.i_m.items[i].PRICE = this.d_

  }  

  this.ss.i_m.flags[0].IS_SERVER_RES = true

  for(this.j=0;this.j<this.ss.i_m.items.length;this.j++)
  {
      

        this.ss.i_m.items[this.j].RATE_SUM = this.ss.i_m.items[this.j].PRICE * this.ss.i_m.items[this.j].QTY
  
        this.ss.i_m.items[this.j].ITEM_SUM = this.ss.i_m.items[this.j].NET_PRICE * this.ss.i_m.items[this.j].QTY

         // this.ss.i_m.tails[0].SUB_TOTAL = (this.ss.i_m.tails[0].SUB_TOTAL-0) + (this.ss.i_m.items[this.j].RATE_SUM-0)
         // this.ss.i_m.tails[0].GRAND_TOTAL =  (this.ss.i_m.tails[0].GRAND_TOTAL-0) +  this.ss.i_m.items[this.j].ITEM_SUM 
    


  }

  
}

push_ss_edit(len)
{
  for(var i=0;i<len;i++)
        {          
          this.ss.i_m.items.push({ SI_NO:0,DESCRIPTION:'',HSN_CODE:'',ARTICLE_CODE:'',BRAND_NAME:'',SPECIFICATION:'',CATEGORY:''
          ,QTY:1,TAX:null,PRICE:null,UNIT:null,NET_PRICE:null,RATE_SUM:0,ITEM_SUM:0,IS_RETURN:false })    
        }
}





}
