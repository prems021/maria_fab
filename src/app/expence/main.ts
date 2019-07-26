import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { exp_invo } from './model';

import { pdt_array } from './model';
import { vendor_model } from './model';


@Component({
  selector: 'app-expence-main',
  templateUrl: './main.html',
  styleUrls: ['./main.css']
})
export class Expence_main implements OnInit {

  catForm: FormGroup;
  customer_u_Form: FormGroup;
  customer_d_Form: FormGroup;
  arrayOfCusValues : any[] =[];
  is_rec_no : number = 1;
  exp_entry_no : number = 1;
  from_date : string;
  is_itemss : number = 1;
  purchases : any [] = [];
  exp_invos = new exp_invo(1,'Purchase',0,[],'','',0,0,0,0,0,'','','');
  arrayOfKeyValues :  any [] =[];
   k : number = -1;

   product_array : pdt_array[] =[];
  
   arrayOfvendorValues :  any [] =[];
   j : number = 0 ;
   grand_total : number = 0;
   cats :any[] = [];
   vendsi : any = null
   vends : vendor_model[] = null
  constructor( private fb: FormBuilder, private ds :DataService, private router : Router ) { } 

  ngOnInit() {
  
   
    this.get_products();
    this.get_exp_reciept_no();
    this.get_exp_type_list();
  //  this.get_third_party();
    this.get_vendors();
    this.get_cat_list();
    
    this.catForm = this.fb.group({ 

      Category_name : ['', [<any>Validators.required, <any>Validators.minLength(3)]],
      
      
    });



      this.customer_d_Form = this.fb.group({ 

      customer_name : ['', [<any>Validators.required, <any>Validators.minLength(3)]],
      street : '',
      city : '',
      gstin :'',
      ph1 :'',
      ph2 : '',
      opbal : '',
      last_invo_num : ''
      
    });


document.getElementById("defaultOpen").click();
    
    
  }

  change_igst()
  {
    this.cal_net_price();
  }

  
  change_cgst()
  {
    this.cal_net_price()
  }

  
  change_sgst()
  {
    this.cal_net_price();
  }

change_opt(bi : any)
{
  this.exp_invos.E_CATEGORY = bi;
}
save_expense()
{

  console.log('EEE',this.exp_invos)

  if(this.exp_invos.E_CATEGORY === 'Purchase')
  {
    alert ('Enter purchase catogory on purchase menu');
  }

  else if (this.exp_invos.DATE === '')
  {
    alert ('Select Date');
  }
  else
  {
       console.table('ec',this.exp_invos);
  this.ds.save_other_expense(this.exp_invos)
    .subscribe((jsonData) => { this.getjson49(jsonData)
                      },(err) => console.error(err),
                       
                      );
  }

  
}
getjson49(json :any)
  {
   alert(json.msg);
   this.router.navigate(['/dash']);
  }

// get_third_party()
// {
//    this.ds.get_party_list()
//   .subscribe((jsonData) => { this.getjson45(jsonData)
//                       },(err) => console.error(err),
                       
//                       );
// }

getjson45(json :any)
  {
   this.arrayOfCusValues = json;
  }
get_exp_type_list()
{
   this.ds.get_exp_type_list()
      .subscribe((jsonData) => { this.getjsonss(jsonData)
                      },(err) => console.error(err)
                     
                      );

}

getjsonss(json :any)
  {
    
   
   for( var i = 0 ; i < json.length; i++)
  this.purchases[i] = json[i].CATEGORY_NAME;
  }



 get_exp_reciept_no()
 {
    this.ds.get_exp_rec_no()
              .subscribe((jsonData) => { this._get_rec_no(jsonData)
                      },(err) => console.error(err),
                       
                      );
 }
_get_rec_no(json :any)
        {     
            console.log('ci',json);
            this.exp_invos.E_ENTRY_NUMBER = json.count+1
            this.is_rec_no = 1;
        
       
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
            console.log('json',this.product_array);
           
       
         }

         get_vendors()
         {
          this.ds.get_vendors_all()
          .subscribe((jsonData) => { this._get_vendors(jsonData)
                  },(err) => console.error(err),
                    
                  );
         }

         _get_vendors(json:any)
         {
           console.log(json)
           this.arrayOfvendorValues = json
         
           this.vends = json;
         }

addItem()
{
  this.exp_invos.ITEMS.push({SI_NO:1,CATEGORY:'',HSN_CODE:'', DESCRIPTION:'', QTY:0,UNIT:'',PRICE:0,NET_PRICE:0})

}

add_cat()
{
  console.log(this.catForm.value);
  this.ds.add_expense_category(this.catForm.value)
      .subscribe((jsonData) => { this.getjson(jsonData)
                      },(err) => console.error(err)
                      
                      );


}
 getjson(json :any)
  {
    
  
   if (json.msg ==='Successfully saved')
   {
      alert('Category added sucessfully')
      this.router.navigate(['/dash']);
   }

   else if (json.msg === 'Category name already existed')
   {
      alert('Category already existed')
      this.router.navigate(['/dash']);
   }
  }



  get_cat_list()
  {

    
  
  
    this.ds.get_product_category()
    .subscribe((jsonData) => { this.get_res_cat_list(jsonData)
                    },(err) => console.error(err),
                   
                    );

  }
  get_res_cat_list(json:any)
  {
    console.log(json)
    for(var jp=0; jp<json.length;jp++)
    {
      this.cats[jp] = json[jp].CATEGORY_NAME

    }
    
   }
  

vendor_blur(vn:any)
{

this.exp_invos.VENDOR = vn;
console.log(this.vendsi);
this.exp_invos.STREET = this.vendsi.STREET
this.exp_invos.GST_IN = this.vendsi.GSTIN

}








focus_one(index:number)
{
  this.k = index ;
  this.exp_invos.ITEMS[this.k].SI_NO = index + 1;
}

  change_one(item_name:any)
{
  console.log(item_name)
    let s : any; 
s = this.product_array.filter(xi=> xi.DESCRIPTION === item_name);

if(s.length > 0)
{

this.exp_invos.ITEMS[this.k].CATEGORY = s[0].CATGERY;
this.exp_invos.ITEMS[this.k].UNIT = s[0].UNIT;
this.exp_invos.ITEMS[this.k].DESCRIPTION = s[0].DESCRIPTION;

this.exp_invos.ITEMS[this.k].HSN_CODE = s[0].HSN_CODE;
console.log('eeeeeee',this.exp_invos);

 }


   
 else

 {

 }    
   
       
 }



 change_qty(qty:any)
 {
   this.exp_invos.ITEMS[this.k].QTY = qty
   
        this.cal_net_price();
   
 }

 change_price(price:any)
 {

   this.exp_invos.ITEMS[this.k].PRICE = price;

  
   this.cal_net_price();
    
 }

cal_net_price()
{
  this.exp_invos.ITEMS[this.k].NET_PRICE = this.exp_invos.ITEMS[this.k].PRICE * this.exp_invos.ITEMS[this.k].QTY;

   this.exp_invos.GRAND_TOTAL = 0; 


   for(this.j=0;this.j<this.exp_invos.ITEMS.length;this.j++)
  {

    this.exp_invos.GRAND_TOTAL  = this.exp_invos.GRAND_TOTAL  + this.exp_invos.ITEMS[this.j].NET_PRICE 


  }

     this.exp_invos.GRAND_TOTAL  = (this.exp_invos.GRAND_TOTAL-0) + ((this.exp_invos.CGST-0) + (this.exp_invos.SGST-0) + (this.exp_invos.IGST-0) )

}

cat_from_date(s:any)
{ 
    
   this.exp_invos.DATE = s._validSelected.toLocaleDateString();

}

cat_to_date(s:any)
{ 
    
   this.exp_invos.DATE = s._validSelected.toLocaleDateString();

}

cus_blur(name:any)
{
  this.exp_invos.VENDOR =name;
}
billno_blur(no:any)
{
  this.exp_invos.BILL_NO = no
}









removeItem(ii:any)
{
  console.log('hi')
  this.exp_invos.ITEMS.pop()
  
}

 openCity(evt, cityName) {

  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
}



Save_purchase()
{
  if(this.exp_invos.DATE === '' ||  this.exp_invos.DATE === null)
  {
    alert('select Date')
  }

  else

  {
  
  this.ds.add_purchase_entry(this.exp_invos)
  .subscribe((data) => { this.res(data)
                      },(err) => console.error(err),
                       
                     );
  }

}


res(json:any)
{
  console.log('j',json)
  if (json.msg === "Successfully saved")
  
   alert('Purchase Saved')

 this.router.navigate(['/dash']);

}



   
}