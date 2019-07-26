import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
@Component({
  selector: 'app-update-product',
  templateUrl: './update.html',
  styleUrls: ['./update.css']
})
export class Update_product implements OnInit {

 productForm: FormGroup;
 d_ : number = 0;
 snak_msg : string = '';
 arrayOfproductValues : any[] =[];
 cats :any[] = [];
 post : any = {"f":"k"};
 units = ['pc','ltr','mtr','barrel','set','Nos','pkt','box','kg','gm','ton'];
     constructor(private router: Router, private ds: DataService ,private fb: FormBuilder) {
    
     
    
  }
  

  ngOnInit() {
                  this.get_products();
                  this.get_all_category();
     
    this.productForm = this.fb.group({ 

      description : ['', [<any>Validators.required, <any>Validators.minLength(3)]],
      category : [''], 
      hsn_code : [''],
      article_code : [''],
      specification : [''],  
      brand_name : [''],
      unit : [''],
      tax : '',  
      price:[''],
      pur_price:[''],
      net_price:[''],
      avail_qty:['']
      
    
    });
    
  }


  get_products()
  {
       this.ds.get_product_list()
  .subscribe((jsonData) => { this.p_r(jsonData)
                      },(err) => console.error(err),
                      
                      );
  }
  p_r(json:any)
  {
     this.arrayOfproductValues = json;
     console.log('pdts',this.arrayOfproductValues)
   

  }
 

  article_blur(ss:any)
  {
        let s : any; 

s = this.arrayOfproductValues.filter(xi=> xi.ARTICLE_CODE === ss);

console.log(s);

      this.productForm.patchValue({article_code: ss,  description : s[0].DESCRIPTION , category : s[0].CATGERY , brand_name : s[0].BRAND_NAME,specification: s[0].SPECIFICATION,
        hsn_code : s[0].HSN_CODE,pur_price : s[0].PUR_PRICE, net_price : s[0].NET_PRICE, tax : s[0].TAX , 
                avail_qty : s[0].AVAIL_QTY , 
                 unit : s[0].UNIT,price : s[0].PRICE });
  }

  cal_price()
   {


     console.log('net',this.productForm.controls.net_price.value);
     this.d_ = this.productForm.controls.net_price.value * 100 / (100 + this.productForm.controls.tax.value);
   
     this.productForm.patchValue({price : this.d_ });

       

   }

  

  update_product()
  {
      this.ds.update_product(this.productForm.value)
      .subscribe((jsonData) => { this.getjson(jsonData)
                      },(err) => console.error(err),
                     
                      );

  
  }



  delete_product()
  {
     this.ds.delete_product(this.productForm.value)
      .subscribe((jsonData) => { this.getjson_del(jsonData)
                      },(err) => console.error(err),
                     
                      );
  }

  getjson_del(json:any)
  {
     if (json.msg ==='Successfully deleted')
   {
      alert('Product Deleted')
      this.router.navigate(['/dash']);
   }

  
   else{
      alert('Something wrong try again')
      this.router.navigate(['/dash']);
      }
  }

     getjson(json :any)
  {
    
  
   if (json.msg ==='Successfully updated')
   {
      alert('Product Updated')
      this.router.navigate(['/dash']);
   }

  
   else{
      alert('Something wrong try again')
      this.router.navigate(['/dash']);
   }
   
  }





  get_res(json:any)
  {
    var x = 1
      if(x > 0)
      {
       this.snak_fun(json.msg); 
       x = -2;
      }
   
    
  }

    get_all_category()
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

snak_fun(msg:string)
{
      this.snak_msg = msg;
      var x = document.getElementById("snackbar");
      x.className = "show";
     setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
    
}


}