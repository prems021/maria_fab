import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';
import { SharingService } from '../services/sharing.service';
import { DataService } from '../services/data.service';
import { User_role } from '../services/user_role';
import { AuthGuard } from '../services/auth.guard';


@Component({
  selector: 'app-return',
  templateUrl: './main.html',
  styleUrls: ['./main.css']
})
export class ReturnComponent implements OnInit {
 
  invoice_string: string = ''
  isClickedOnce : boolean = false
  d_ : number = 0;
  j : number = 0
  fystring : string[] = [];
  post_model : any = {invo_string : "",is_b2b:false , invo_number: 0}
 
  constructor( private router: Router,private ds: DataService,private fb: FormBuilder, private ss : SharingService , private ag: AuthGuard , private ur : User_role) {   }
  ngOnInit()  {
  
   
  }
    

  
   
  
    search_invoice()
    {
      console.log('is',this.invoice_string)
      this.fystring = this.invoice_string.split('/');
      console.log('this.',this.fystring);

      this.post_model.invo_string = this.fystring[0]
      if(this.fystring[1] === 'c' || this.fystring[1] === 'C' )
      {
      this.post_model.is_b2b = false
      this.ss.i_m.configs[0].IS_B2B = false
      }
     else
     {
      this.post_model.is_b2b = true
      this.ss.i_m.configs[0].IS_B2B = true
     }
     this.post_model.invo_number =this.fystring[2];


     this.ds.get_a_invoice_return(this.post_model)
  .subscribe((jsonData) => { this._get_a_invoice(jsonData) 
    },(err) => console.error(err));

    
    }

    _get_a_invoice(data : any)
    {
     console.log(data)
      if(data.success === false)
      {
        alert('Bill not found')
      }
      else
      {
       
        this.make_master(data.master)
        this.make_slave(data.slave)
        


      }
    
  
    
    }
    

    is_ret(index:any)
    {
      
       console.log('isr',this.ss.i_m.items[index].IS_RETURN);
      

   
  // this.calculate()


    }

    calculate()
    {
      for(var kim = 0 ; kim< this.ss.i_m.items.length; kim++)
      {
         console.log('index')

         if(this.ss.i_m.items[kim].IS_RETURN === true)

           this.ss.i_m.tails[0].TOTAL_DUE = (this.ss.i_m.tails[0].TOTAL_DUE-0) - ((this.ss.i_m.items[kim].PRICE * (this.ss.i_m.items[kim].TAX * this.ss.i_m.items[kim].QTY) )/100)


      }
    }

   
make_master(data)
{
 
  this.ss.i_m.heads[0].BUNDLES = data.BUNDLES
  this.ss.i_m.heads[0].CUSTOMER_CITY = data.CUSTOMER_CITY
  this.ss.i_m.heads[0].CUSTOMER_GST_IN = data.CUSTOMER_GST_IN
  this.ss.i_m.heads[0].CUSTOMER_NAME = data.CUSTOMER_NAME
 
  this.ss.i_m.heads[0].CUSTOMER_PHONE = data.CUSTOMER_PHONE
  this.ss.i_m.heads[0].CUSTOMER_PHONE2 = data.CUSTOMER_PHONE2
  this.ss.i_m.heads[0].CUSTOMER_STREET = data.CUSTOMER_STREET
  this.ss.i_m.heads[0].PLACE_SUPPLY = data.PLACE_SUPPLY
  this.ss.i_m.heads[0].TRANS_MODE = data.TRANS_MODE
  this.ss.i_m.heads[0].VEH_NO = data.VEH_NO
  this.ss.i_m.heads[0].INVOICE_NUMBER = data.INVOICE_NUMBER
  this.ss.i_m.heads[0].INVOICE_STRING = data.INVOICE_STRING
  this.ss.i_m.heads[0].CUSTOMER_PAN = data.PAN_NO

  this.ss.i_m.tails[0].GRAND_TOTAL = data.GRAND_TOTAL
  this.ss.i_m.tails[0].TOTAL_TAX = data.TAX_COLLECTED
  this.ss.i_m.tails[0].SUB_TOTAL = data.SUB_TOTAL
  this.ss.i_m.tails[0].TOTAL_CESS = data.CESS_COLLECTED
  this.ss.i_m.tails[0].TOTAL_DUE = data.TOTAL_DUE
  this.ss.i_m.tails[0].OLD_DUE = data.TOTAL_DUE
  this.ss.i_m.tails[0].TOTAL_PRE_PAID = data.TOTAL_PAYED
  
  this.ss.i_m.tails[0].TOTAL_PAID_TODAY = 0;
  this.ss.i_m.tails[0].GRAND_TOTAL = data.GRAND_TOTAL;
  this.ss.i_m.configs[0].IS_PARTIAL_PAY = data.IS_PARTIAL_PAY;
  this.ss.i_m.configs[0].ITEM_LENGTH = data.ITEM_LENGTH;
  this.ss.i_m.configs[0].ITEM_OLD_LENGTH = data.ITEM_LENGTH;
  this.ss.i_m.varibs[0].I = data.ITEM_LENGTH -  2;
  this.ss.i_m.varibs[0].K = data.ITEM_LENGTH -  2;
  this.ss.i_m.flags[0].IS_INVO_NUMBER_LOADED = true;
  this.ss.i_m.flags[0].DATE_CHANGE_FLAG = 2 ;
  this.ss.i_m.flags[0].CHANGE_OVER_FLAG = true;
 
}

make_slave(data)
{
  this.push_ss_edit(data.length-1);
  for(var i=0;i<data.length;i++)
  {

    this.ss.i_m.items[i].DESCRIPTION = data[i].PRODUCT_DESCRIPTION   
     
     this.ss.i_m.items[i].CATEGORY = data[i].CATGERY
    this.ss.i_m.items[i].HSN_CODE = data[i].HSN_CODE
    this.ss.i_m.items[i].ARTICLE_CODE = data[i].ARTICLE_CODE;
    this.ss.i_m.items[i].SPECIFICATION = data[i].SPECIFICATION;
   
    this.ss.i_m.items[i].PRICE = data[i].PRICE
    this.ss.i_m.items[i].QTY = data[i].QUANTITY
    this.ss.i_m.items[i].SI_NO = data[i].SI_NO
    this.ss.i_m.items[i].UNIT = data[i].UNIT
    this.ss.i_m.items[i].TAX = data[i].TAX
    this.ss.i_m.items[i].NET_PRICE = data[i].NET_PRICE 
    this.d_ = data[i].NET_PRICE  * 100 / (100 + this.ss.i_m.items[i].TAX);
    this.ss.i_m.items[i].PRICE = this.d_
   

  }  

  this.ss.i_m.flags[0].IS_SERVER_RES = true

  for(this.j=0;this.j<this.ss.i_m.items.length;this.j++)
  {
       this.ss.i_m.items[this.j].RATE_SUM = ((this.ss.i_m.items[this.j].PRICE-0) *  (this.ss.i_m.items[this.j].QTY));
       this.d_ = ((this.ss.i_m.items[this.j].PRICE-0) +  (this.ss.i_m.items[this.j].PRICE-0)  * ((this.ss.i_m.items[this.j].TAX / 100)-0))
       this.ss.i_m.items[this.j].NET_PRICE = this.d_ * this.ss.i_m.items[this.j].QTY ;
       this.ss.i_m.items[this.j].NET_PRICE =  Math.round(this.ss.i_m.items[this.j].NET_PRICE * 100) / 100 ;
    


  }

  
}
push_ss_edit(len)
{
  for(var i=0;i<len;i++)
        {          
          this.ss.i_m.items.push({ SI_NO:0,DESCRIPTION:'',HSN_CODE:'',ARTICLE_CODE:'',SPECIFICATION:'',BRAND_NAME:'',CATEGORY:''
          ,QTY:1,TAX:null,PRICE:null,UNIT:null,NET_PRICE:null,RATE_SUM:0,ITEM_SUM:0,IS_RETURN:false })    
        }
}


save_return()
{
  console.table(this.ss.i_m);
  this.isClickedOnce = true

  this.ds.post_a_return(this.ss.i_m)
  .subscribe((jsonData) => { this._get_ret_res(jsonData) 
    },(err) => console.error(err));



}

_get_ret_res(json:any)
{
 

  if(json.success === true)
    {
      alert('Return updated');
      this.router.navigate(['/dash']);
    }
}
  
}

