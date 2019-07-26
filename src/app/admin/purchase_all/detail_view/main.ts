import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { exp_invo } from './model';
import { SharingService } from '../../../services/sharing.service';
import { pdt_array } from './model';
import { vendor_model } from './model';


@Component({
  selector: 'app-expence-main-det',
  templateUrl: './main.html',
  styleUrls: ['./main.css']
})
export class Expence_main_details implements OnInit {

  catForm: FormGroup;
  customer_u_Form: FormGroup;
  customer_d_Form: FormGroup;
  arrayOfCusValues : any[] =[];
  is_rec_no : number = 1;
  exp_entry_no : number = 1;
  from_date : string;
  is_itemss : number = 1;
  purchases : any [] = [];
  isClickedOnce : boolean = false;

  exp_invos = new exp_invo(1,'Purchase',0,[],'','',0,0,0,0,0,'','','');
  arrayOfKeyValues :  any [] =[];
   k : number = -1;

   product_array : pdt_array[] =[];
  
   arrayOfvendorValues :  any [] =[];
   j : number = 0 ;
   grand_total : number = 0;
   cats :any[] = [];
   vendsi : any = {CUSTOMER_NAME:'',STREET:'',GSTIN:''}
   venni : any[] = [{DESCRIPTION: "kkkk",NET_PRICE:0, PRICE:0 , TAX: 0 , UNIT: 'pc'}]

   vends : vendor_model[] = null
   post_model : any = {eeno : 0};

   date_flag : number = 0;
  constructor( private fb: FormBuilder, private ds :DataService, private router : Router ,private ss: SharingService ) { } 

  ngOnInit() {
  
    
    this.get_products();
     this.update_records();
    this.get_exp_type_list();
  
    this.get_vendors();
    this.get_cat_list();
    this.date_flag = 2 ;
    
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


    
    
  }



Update_purchase()
{
  console.log('exp',this.exp_invos)

   this.ds.update_purchase(this.exp_invos)
      .subscribe((jsonData) => { this.getjsonres(jsonData)
                      },(err) => console.error(err)
                     
                      );
}


getjsonres(json:any)
{

  if(json.success === true)
  {
    alert(json.msg)
  }

  else
  {
    alert('error')
  }


}






change_date()
{
  this.date_flag = 1 ;
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



 
update_records()
        {     
          
            this.exp_invos.E_ENTRY_NUMBER = this.ss.i_m.heads[0].INVOICE_NUMBER;
            this.exp_invos.GRAND_TOTAL = this.ss.i_m.tails[0].GRAND_TOTAL
            this.exp_invos.VENDOR = this.ss.i_m.heads[0].CUSTOMER_NAME
            this.vendsi.CUSTOMER_NAME = this.ss.i_m.heads[0].CUSTOMER_NAME
            this.exp_invos.BILL_NO = this.ss.i_m.tails[0].TOTAL_CESS
            this.exp_invos.DATE = this.ss.i_m.heads[0].BILL_DATE


         this.exp_invos.IGST = this.ss.i_m.tails[0].TOTAL_PRE_PAID ;
         this.exp_invos.CGST = this.ss.i_m.tails[0].TOTAL_PAID_TODAY;
         this.exp_invos.SGST = this.ss.i_m.tails[0].TOTAL_DUE;

          this.exp_invos.STREET = this.ss.i_m.heads[0].CUSTOMER_STREET
          this.exp_invos.GST_IN = this.ss.i_m.heads[0].CUSTOMER_GST_IN 
           
            


            this.is_rec_no = 1;
            this.post_model.eeno =   this.exp_invos.E_ENTRY_NUMBER ;
            
              this.ds.get_expence_details(this.post_model)
                .subscribe((jsonData) => { this.get_dets(jsonData)
                      },(err) => console.error(err)
                     
                      );
        
       
         }



get_dets(json:any)
{
  console.log('jssjs..........',json)

for(this.k = 0 ; this.k < json.length; this.k++)

{

  this.addItem()


this.exp_invos.ITEMS[this.k].CATEGORY = json[this.k].CATEGORY;
this.exp_invos.ITEMS[this.k].QTY = json[this.k].QUANTITY
this.exp_invos.ITEMS[this.k].PRICE = json[this.k].PRICE;
this.exp_invos.ITEMS[this.k].ARTICLE_CODE = json[this.k].ARTICLE_CODE;
this.exp_invos.ITEMS[this.k].BRAND = json[this.k].BRAND;
this.exp_invos.ITEMS[this.k].SPECS = json[this.k].SPECS
this.exp_invos.ITEMS[this.k].NET_PRICE = json[this.k].PRICE * json[this.k].QUANTITY

this.exp_invos.ITEMS[this.k].DESCRIPTION = json[this.k].DESCRI_NAME;




}
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
            console.log('json',json);
            // this.isServer_res = true;
       
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
  this.exp_invos.ITEMS.push({"SI_NO":1,"DESCRIPTION":'',HSN_CODE:'',ARTICLE_CODE:'',SPECS:'',BRAND:'',CATEGORY:'',"QTY":1,"UNIT":'',"PRICE":0,"NET_PRICE":0})

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
s = this.product_array.filter(xi=> xi.ARTICLE_CODE === item_name);

if(s.length > 0)
{

this.exp_invos.ITEMS[this.k].CATEGORY = s[0].CATGERY;
this.exp_invos.ITEMS[this.k].UNIT = s[0].UNIT;
this.exp_invos.ITEMS[this.k].DESCRIPTION = s[0].DESCRIPTION;
this.exp_invos.ITEMS[this.k].SPECS = s[0].SPECIFICATION;
this.exp_invos.ITEMS[this.k].BRAND = s[0].BRAND_NAME;

this.exp_invos.ITEMS[this.k].ARTICLE_CODE = item_name;

this.exp_invos.ITEMS[this.k].HSN_CODE = s[0].HSN_CODE;
console.log('eeeeeee',this.exp_invos);

 }


   
 else

 {

 }    
       
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

  this.isClickedOnce = true
  if(this.exp_invos.DATE === '' ||  this.exp_invos.DATE === null)
  {
    alert('select Date')
  }

  else

  {
     this.isClickedOnce = true

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