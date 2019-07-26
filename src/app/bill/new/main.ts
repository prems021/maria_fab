import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup,FormControl, Validators} from '@angular/forms';
import { DataService } from '../../services/data.service';
import { SharingService } from '../../services/sharing.service';
import { UpdateService } from'../../services/update.service';
import { pdt_model } from './model';
import { figure } from './model';
import {tax_deri}  from './model';
import  { hsn_array }  from './model';




@Component({
  selector: 'b2b-invoice',
  templateUrl: './main.html',
  styleUrls: ['./main.css']
})
export class Bill_b2b  {


  
   z : number = -1;
   j : number;
   total_qty : number = 0;
   invoice_number_b2b : number = 0;
   invoice_number_b2c : number = 0;
   company_name : string = 'MARIA FAB';
   company_gst : string = '32COQPD8681G1ZN';
   invo_string : string = '';
   vendsi : any = null ;

   
   
   is_b2b : boolean = false;
   isClickedOnce : boolean = false;
   disabled_button : boolean =true; 
   isPrint : boolean = true;
 
   customer_name : string = '';
   is_invo_num_loaded : boolean = false
   isServer_res : boolean = false
  
  
   arrayOfKeyValues: any[] = [];
   arrayOfspecValues: any[] = [];
   arrayOfCusValues : any[] =[];
   specs :any[] = []
 
  fig_model = new figure(0,0,'');
  product_array : pdt_model[] =[];
  stock_check : number = 0;
  figured_out : string;
  fig_main : string ;
  fig_tax : string ;
  fig_sub : string ;
  floor : number;
  frac : number;
  date_change_flag : number = 0;
  snak_msg : string = '';
  print_section : boolean = false;
  b: number = 0;
  d_ : number = 0;
  tax_d = new tax_deri(0,[]);
  bool : boolean ;
  tax_index : number = 0;
  total_rate_sum : number = 0;
  se_ind : number = 0;
  sehsn_ind : number = 0;
  total_tax_tot_value : number = 0;
  arr_ : number = 0;
  post_qq : any = {invo_string : "",is_b2b:false}
  up_click_once : boolean = false;

  height_var : number[] = [];

  hsn_arra :  hsn_array[] = []

  constructor(private fb: FormBuilder, private ds :DataService, private router : Router,
                         private us : UpdateService, private ss : SharingService) { }
 ngOnInit() {

     
    this.get_products();




       
   
  }


 



change_date()
{
  this.ss.date_change_flag = 0;
}
    push_items( si : number )
    
           {
           
             if(si > this.ss.i_m.items.length)
             {
               
               this.ss.i_m.items.push({ SI_NO:si,DESCRIPTION:'',HSN_CODE:'',ARTICLE_CODE:'',BRAND_NAME:'',SPECIFICATION:'',CATEGORY:'', QTY:1,TAX:0,
               PRICE:0,UNIT:'pc',NET_PRICE:0,RATE_SUM:0,ITEM_SUM:0,IS_RETURN: false })

              }
              else
              {
                 this.reset_ss();
              }
            }

            reset_ss()
            {
             this.z = this.ss.i_m.items.length
              while (this.z > 1) 
              {
                 this.ss.i_m.items.pop();
                  this.z--
                  
              }
            this.ss.i_m.tails[0].SUB_TOTAL = 0;
            }

    get_products()
            {
              this.ds.get_products_list()
              .subscribe((jsonData) => { this._get_products(jsonData)
                      },(err) => console.error(err),
                       
                      );
           }

      _get_products(json :any)
        {     
            this.arrayOfKeyValues = json;
            
            this.product_array = json;
            this.isServer_res = true;
            
            for(var nip = 0; nip < json.length; nip++)
           
            {
              this.specs[nip] = json[nip].SPECIFICATION
            }

         

            
       
         }

 push_tax_der(x:any)
 {
   this.tax_d.SI = x;
   this.tax_d.deri.push({SI:1,HSN:'',TAX:0,TAXABLE_VALUE:0,CT_RATE:0,CT_AMT:0,ST_RATE:0,ST_AMT:0,TOT_AMT:0})

 }         


change_one(item_code:any)
{


if(this.ss.i_m.configs[0].IS_ON_UPDATE === false)
{

    
              this.ss.i_m.items[this.ss.i_m.varibs[0].K].ARTICLE_CODE = item_code
             
              let si : any; 
              
            si = this.product_array.filter(xi=> xi.ARTICLE_CODE  === item_code);

            if(si.length > 0)
            {

              this.stock_check = si[0].AVAIL_QTY ;

            this.ss.i_m.items[this.ss.i_m.varibs[0].K].DESCRIPTION = si[0].DESCRIPTION;


            this.ss.i_m.items[this.ss.i_m.varibs[0].K].CATEGORY = si[0].CATGERY;
            this.ss.i_m.items[this.ss.i_m.varibs[0].K].HSN_CODE = si[0].HSN_CODE;
            this.ss.i_m.items[this.ss.i_m.varibs[0].K].BRAND_NAME = si[0].BRAND_NAME;
            this.ss.i_m.items[this.ss.i_m.varibs[0].K].SPECIFICATION = si[0].SPECIFICATION;
            this.ss.i_m.items[this.ss.i_m.varibs[0].K].UNIT = si[0].UNIT;
            this.ss.i_m.items[this.ss.i_m.varibs[0].K].TAX = si[0].TAX;
            this.ss.i_m.items[this.ss.i_m.varibs[0].K].NET_PRICE = si[0].NET_PRICE;

          }

          else

          {
            this.snak_fun('Enter valid Specification');
          }


}

else

{
   

}










this.calculation();






}



push_hsn()
{
  this.hsn_arra.push({SI : 0,hsn:[]})
}




smart_dervation(len:any)
{
   var ip =0; var kp = 0;
 for(ip;ip<len;ip++)
   {

    this.bool =  this.check_dup(this.ss.i_m.items[ip].TAX)
   
     if(this.bool === true)
     {
       this.se_ind =  this.seach_index(this.ss.i_m.items[ip].TAX)
      
       var templeng = this.hsn_arra[this.se_ind].hsn.length
        
      



       this.search_hsn_index(this.ss.i_m.items[ip].HSN_CODE,this.se_ind)
      
       
    
       this.tax_d.deri[this.se_ind].TAXABLE_VALUE = (this.tax_d.deri[this.se_ind].TAXABLE_VALUE-0) + ((this.ss.i_m.items[ip].RATE_SUM))
       // this.tax_d.deri[this.se_ind].TAXABLE_VALUE = Math.round(this.tax_d.deri[this.se_ind].TAXABLE_VALUE * 100) / 100 ;
       this.tax_d.deri[this.se_ind].CT_AMT = ((this.tax_d.deri[this.se_ind].TAXABLE_VALUE * this.tax_d.deri[this.se_ind].CT_RATE ) / 100)
      
       this.hsn_arra[this.se_ind].hsn[templeng] = this.ss.i_m.items[ip].HSN_CODE

     }

     else

     {
       this.push_tax_der(1);
       this.push_hsn();
        
        
        this.tax_d.deri[kp].TAX = this.ss.i_m.items[ip].TAX;
        this.tax_d.deri[kp].TAXABLE_VALUE = ((this.ss.i_m.items[ip].RATE_SUM) )
        // this.tax_d.deri[kp].TAXABLE_VALUE = Math.round(this.tax_d.deri[kp].TAXABLE_VALUE * 100) / 100 ;

        this.hsn_arra[kp].SI = kp
        this.hsn_arra[kp].hsn[kp] = this.ss.i_m.items[ip].HSN_CODE
        
        this.tax_d.deri[kp].HSN = this.tax_d.deri[kp].HSN.concat(this.ss.i_m.items[ip].HSN_CODE)
        
 
        this.tax_d.deri[kp].CT_RATE = this.ss.i_m.items[ip].TAX / 2;
        this.tax_d.deri[kp].ST_RATE = this.ss.i_m.items[ip].TAX / 2;

        this.tax_d.deri[kp].CT_AMT =  (this.tax_d.deri[kp].TAXABLE_VALUE * this.tax_d.deri[kp].CT_RATE ) / 100
        
        console.log('tax_o',this.tax_d);
        kp++;
     }
     
   }  


  this.make_height_var()


 }  

make_height_var()
{
  var ips =0; var kps = 0;
  for(ips;ips<this.tax_d.deri.length;ips++)
  {

    if( this.tax_d.deri[ips].HSN.length  < 23 &&  this.tax_d.deri[ips].HSN.length  > 0)
    {
      this.height_var[ips] = 22;
    }
    else if( this.tax_d.deri[ips].HSN.length  < 46 &&  this.tax_d.deri[ips].HSN.length  >= 23)
    {
      this.height_var[ips] = 38;
    }
     else if( this.tax_d.deri[ips].HSN.length  < 69 &&  this.tax_d.deri[ips].HSN.length  >= 46)
    {
      this.height_var[ips] = 54;
    }

     else if( this.tax_d.deri[ips].HSN.length  < 92 &&  this.tax_d.deri[ips].HSN.length  >= 69)
    {
      this.height_var[ips] = 72;
    }
  }

  console.log('len',this.height_var)
}



search_hsn_index(hsn:any,index : any)
{

var op = 0;
for(var mpp  = 0; mpp < this.hsn_arra[index].hsn.length; mpp++)
{
  console.log('incoco',hsn)
  console.log('searching',this.hsn_arra[index].hsn[mpp])
  if(this.hsn_arra[index].hsn[mpp] === hsn)
  {
    op = 1;
  }
  else
  {
    
  }
  console.log('oooooooooooooooop',op)
}

  if(op === 0)
  {
      
       this.tax_d.deri[index].HSN = this.tax_d.deri[index].HSN.concat(',');
       this.tax_d.deri[index].HSN = this.tax_d.deri[index].HSN.concat(hsn)
  }

}








seach_index(tax:any)
{

    var is =0; var ks = 0;
   for(is;is<this.tax_d.deri.length;is++)
   {
   if( this.tax_d.deri[is].TAX === tax )
   {
   ks = 1;
    return is;
   }
   }

 if (ks === 0)
 {
   return 0;
 }

}



check_dup(tax:any)
{

   var i =0; var k = 0;
   for(i;i<this.tax_d.deri.length;i++)
   {
   if( this.tax_d.deri[i].TAX === tax )
   {
   k = 1;
    return true;
   }
   }

 if (k === 0)
 {
   return false;
 }

}




calculation()
{
   
 
   this.ss.i_m.tails[0].GRAND_TOTAL = 0 
   this.total_qty = 0
   this.ss.i_m.tails[0].SUB_TOTAL = 0


      for(this.j=0;this.j<=this.ss.i_m.varibs[0].I+1;this.j++)
  {
    
  this.ss.i_m.items[this.j].RATE_SUM = this.ss.i_m.items[this.j].PRICE * this.ss.i_m.items[this.j].QTY
  
  this.ss.i_m.items[this.j].ITEM_SUM = this.ss.i_m.items[this.j].NET_PRICE * this.ss.i_m.items[this.j].QTY


  this.ss.i_m.tails[0].SUB_TOTAL = (this.ss.i_m.tails[0].SUB_TOTAL-0) + (this.ss.i_m.items[this.j].RATE_SUM-0)
  this.ss.i_m.tails[0].GRAND_TOTAL =  (this.ss.i_m.tails[0].GRAND_TOTAL-0) +  this.ss.i_m.items[this.j].ITEM_SUM 

  this.total_qty = (this.total_qty-0) + (this.ss.i_m.items[this.j].QTY-0) ;

    
    
  }



   this.floor =  Math.floor(this.ss.i_m.tails[0].GRAND_TOTAL);  
   this.frac =  (this.ss.i_m.tails[0].GRAND_TOTAL) % 1;

     if(this.frac > .49)
     {
       this.frac = 1 - this.frac;
       this.floor = this.floor + 1;
     }
   this.get_figure(this.floor);

   this.ss.i_m.tails[0].TOTAL_TAX = ((this.ss.i_m.tails[0].GRAND_TOTAL-0) - (this.ss.i_m.tails[0].SUB_TOTAL-0))

   this.get_fig_tax(this.ss.i_m.tails[0].TOTAL_TAX);

    
  }





   
  


get_fig_tax(y:any)
{
    this.fig_model.number_to_convert = y;
   this.ds.get_figure(this.fig_model)
   .subscribe((jsonData) => { this.getjson89(jsonData)
                      },(err) => console.error(err),
                       
                      );
}
getjson89(json:any)
{
   this.fig_tax = json.msg;
}
change_qty(qty:any)
{
   this.ss.i_m.items[this.ss.i_m.varibs[0].K].QTY = qty;
       if (this.stock_check < qty)
 {
       this.snak_fun("Your Stock remains "+ this.stock_check +" Items Only");
    
 }
   this.calculation();
}  




change_net_price(np:any)
{
   this.ss.i_m.items[this.ss.i_m.varibs[0].K].NET_PRICE = np ;
    
    this.d_ = np * 100 / (100 + this.ss.i_m.items[this.ss.i_m.varibs[0].K].TAX);

    this.ss.i_m.items[this.ss.i_m.varibs[0].K].PRICE = this.d_

    this.calculation();
}

catch_invoice_date(s:any)
{ 
  
   this.ss.date_change_flag = 2 ;
 
   this.ss.i_m.heads[0].BILL_DATE = s._validSelected.toLocaleDateString();

 
}

focus_one(index:number)
{
  this.ss.i_m.varibs[0].K = index ;
}

addItem(inx:number)

{
      
  this.ss.i_m.varibs[0].I= this.ss.i_m.varibs[0].I+1;
      this.push_items(this.ss.i_m.varibs[0].I + 2);  
          
        
}

RemoveItem(knx : number)
{

this.item_arrange(knx);

  this.ss.i_m.items.pop()
 
  this.ss.i_m.varibs[0].I = this.ss.i_m.varibs[0].I - 1;
  this.ss.i_m.varibs[0].K = this.ss.i_m.varibs[0].K - 1;
  this.calculation();

}


 item_arrange(index: number)
 {

    console.log('index',index)
    
    for(this.arr_ = index ; this.arr_ <= this.ss.i_m.varibs[0].I ; this.arr_ ++)
    {

    this.ss.i_m.items[this.arr_].DESCRIPTION = this.ss.i_m.items[this.arr_+1].DESCRIPTION;
    this.ss.i_m.items[this.arr_].HSN_CODE = this.ss.i_m.items[this.arr_+1].HSN_CODE;
    this.ss.i_m.items[this.arr_].QTY = this.ss.i_m.items[this.arr_+1].QTY;
    this.ss.i_m.items[this.arr_].UNIT = this.ss.i_m.items[this.arr_+1].UNIT;
    this.ss.i_m.items[this.arr_].TAX = this.ss.i_m.items[this.arr_+1].TAX;
    this.ss.i_m.items[this.arr_].PRICE = this.ss.i_m.items[this.arr_+1].PRICE;
    this.ss.i_m.items[this.arr_].NET_PRICE = this.ss.i_m.items[this.arr_+1].NET_PRICE;
    this.ss.i_m.items[this.arr_].RATE_SUM  = this.ss.i_m.items[this.arr_+1].RATE_SUM;
    }


 }

item_remove_flag()

{
  if(this.ss.i_m.varibs[0].I === -1)
  {  return true;  }
  else
  {  return false;  }
}  





get_grand_total(gt: any)
{

  this.ss.i_m.tails[0].GRAND_TOTAL = gt
}



   





get_figure(x:any)
{
    
  this.fig_model.number_to_convert = x;
   this.ds.get_figure(this.fig_model)
   .subscribe((jsonData) => { this.getjson87(jsonData)
                      },(err) => console.error(err),
                       
                      );

}

getjson87 (p:any)
{
 
   this.fig_main = p.msg;
  
 
}

print_invoice()
{

  console.log('i_m',this.ss.i_m)

  

  this.smart_dervation(this.ss.i_m.items.length);
  

  if(this.ss.i_m.tails[0].TOTAL_DUE > 0)
  {
   this.ss.i_m.configs[0].IS_PARTIAL_PAY = true;
  }
  else
  {
    this.ss.i_m.configs[0].IS_PARTIAL_PAY  = false;
   }
   
   this.ss.i_m.configs[0].ITEM_LENGTH = this.ss.i_m.items.length
   

    if(this.ss.i_m.heads[0].CUSTOMER_NAME === '' || this.ss.i_m.heads[0].CUSTOMER_NAME === null)
     {    
       
      alert('select a customer'); 
    
    }
    else
    {
      this.isClickedOnce = true;
      this.ds.post_invoice(this.ss.i_m)
      .subscribe((jsonData) => { this.get_res(jsonData)
                      },(err) => console.error(err),
                     
                      );
    }

     
    
  
  

   

    
     
}     

get_res(res : any)
{
console.log('res',res);
 
 if( res.success === true)
   {

     this.print_section = true;
     alert('Invoice Saved')
       window.print();

   if(this.ss.i_m.tails[0].TOTAL_PAID_TODAY > 0)
   {
       this.ss.i_m.flags[0].IS_PAYMENT_ON_BILL = true;

       this.router.navigate(['/cash-on-bill']);
   }
else
{
  this.router.navigate(['/dash']);

}

    

    }

    else
    {
      alert(res.msg)
      this.router.navigate(['/dash']);
    }
}
  





update_invoice()
{
 
 this.up_click_once = true;
 this.calculation();

  this.smart_dervation(this.ss.i_m.items.length);

  this.ss.i_m.configs[0].ITEM_LENGTH = this.ss.i_m.items.length
 
  this.ss.i_m.tails[0].GRAND_TOTAL_DIFF = (this.ss.i_m.tails[0].GRAND_TOTAL-0) - (this.ss.i_m.tails[0].OLD_GRAND_TOTAL-0);


   this.ds.update_invoice(this.ss.i_m)
  .subscribe((jsonData) => { this.get_res_update(jsonData)
                 },(err) => console.error(err),
                );

}

get_res_update(res:any)
{

  
 if( res.success === true)
   {

     this.print_section = true;
     alert('Invoice Saved')
       window.print();

   if(this.ss.i_m.tails[0].TOTAL_PAID_TODAY > 0)
   {
       this.ss.i_m.flags[0].IS_PAYMENT_ON_BILL = true;

       this.router.navigate(['/cash-on-bill']);
   }
else
{
  this.router.navigate(['/dash']);

}

    

    }

    else
    {
      alert(res.msg)
      this.router.navigate(['/dash']);
    }




}


snak_fun(msg:string)
{
      this.snak_msg = msg;
      var x = document.getElementById("snackbar");
      x.className = "show";
     setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
    
}

}


















  


