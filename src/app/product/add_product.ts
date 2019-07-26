import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
@Component({
  selector: 'app-add-product',
  templateUrl: './add_product.html',
  styleUrls: ['./add_product.css']
})
export class Add_product implements OnInit {

 productForm: FormGroup;
 product_add_Form : FormGroup;
 d_ : number = 0;
 snak_msg : string = '';
 modal : any;
 btn : any;
 span : any;
 cats :any[] = [];
 myModal_close : any
 units = ['pc','ltr','mtr','barrel','set','Nos','pkt','box','kg','gm','ton'];
     constructor(private router: Router, private ds: DataService ,private fb: FormBuilder) {
    
     
    
  }
  

  ngOnInit() {

    this.get_all_category()

    this.modal = document.getElementById("myModal");

// Get the button that opens the modal
this.btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
this.span = document.getElementsByClassName("close")[0];


this.product_add_Form = this.fb.group({ 

  cat_name : ['']

})

    this.productForm = this.fb.group({ 

     
      hsn_code : [''],
      category : [''],
      brand_name : [''],
      specification : [''],
      article_code : [''],    
      description : [''],
      opening_stock : [''],
      tax : 18,
      price:[''],
      pur_price:[''],
      net_price:'',
      unit:['']
    
    });
    this.enter_def_tax();
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



  open_modal()
  {
    console.log('hi');
    this.modal.style.display = "block";
  }
  close_modal()
 {
  this.modal.style.display = "none";
 }
  
 enter_def_tax()
  {

    this.productForm.patchValue({opening_stock:0,price:0 });
  }

  add_cat()
  {
    this.ds.add_product_category(this.product_add_Form.value)
    .subscribe((jsonData) => { this.get_res_cat(jsonData)
                    },(err) => console.error(err),
                   
                    );
  }
  get_res_cat(json:any)
  {
   
      this.snak_fun(json.msg);
      this.get_all_category();

    
  }

  cal_price()
   {


     console.log('net',this.productForm.controls.net_price.value);
     this.d_ = this.productForm.controls.net_price.value * 100 / (100 + this.productForm.controls.tax.value);
 
     this.productForm.patchValue({price : this.d_ });

       

   }



  add_product()
  {
      this.ds.add_product(this.productForm.value)
      .subscribe((jsonData) => { this.get_res(jsonData)
                      },(err) => console.error(err),
                     
                      );
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
snak_fun(msg:string)
{
      this.snak_msg = msg;
      var x = document.getElementById("snackbar");
      x.className = "show";
     setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
    
}


}