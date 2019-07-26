import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { DataService } from '../../services/data.service';
@Component({
  selector: 'app-customer-manage',
  templateUrl: './main.html',
  styleUrls: ['./main.css']
})
export class Customer_Component implements OnInit {


 
  customerForm: FormGroup;
  customer_u_Form: FormGroup;
  customer_d_Form: FormGroup;
  arrayOfCusValues : any[] =[];
  constructor( private fb: FormBuilder, private ds :DataService, private router : Router ) { } 

  ngOnInit() {
  
  this.get_customers();
    this.customerForm = this.fb.group({ 

      customer_name : ['', [<any>Validators.required, <any>Validators.minLength(3)]],
      vendor_name : ['', [<any>Validators.required, <any>Validators.minLength(3)]],
      street : '',
      city : '',
      gst :'',
      ph_no:'',
      ph_no2:'',
      Opening_bal:0,
      credit_bal : 0,
      last_invo_num:0,
      is_vendor : true     
    });

 

      this.customer_d_Form = this.fb.group({ 

      customer_name : ['', [<any>Validators.required, <any>Validators.minLength(3)]],
      vendor_name : ['', [<any>Validators.required, <any>Validators.minLength(3)]],
      street : '',
      city : '',
      gstin :'',
      ph1 :'',
      ph2 : '',
      opbal : '',
      last_invo_num : '',
      is_vendor : true 
      
    });


document.getElementById("defaultOpen").click();
     // this.openCity('','London')
    
  }

  slide_change(x:any)
  {
    if(x.checked === true)
    {
      this.customerForm.patchValue({ is_vendor : true }) 
    }
    else
    {
      this.customerForm.patchValue({ is_vendor : false }) 
    }

    console.log('ch',this.customerForm.controls.is_vendor.value)
  }

  add_customer()
  {
   
    this.ds.add_customer(this.customerForm.value)
     .subscribe((jsonData) => { this.res_(jsonData)  
                      },(err) => console.error(err)
                       
                      );

  }
res_(json:any)
{
alert(json.msg);
this.router.navigate(['/dash']);
}



cus_blur_del(xx:any)
{

 let s : any; 


s = this.arrayOfCusValues.filter(xi=> xi.CUSTOMER_NAME === xx);

 if(s.length > 0)
 {
this.customer_d_Form.patchValue({customer_name :s[0].CUSTOMER_NAME }) ;
this.customer_d_Form.patchValue({street :s[0].STREET }) ;
this.customer_d_Form.patchValue({city :s[0].CITY }) ;
this.customer_d_Form.patchValue({gstin :s[0].GSTIN }) ;
this.customer_d_Form.patchValue({ph1 :s[0].PHONE }) ;
this.customer_d_Form.patchValue({ph2 :s[0].MOBILE }) ;
this.customer_d_Form.patchValue({opbal :s[0].OPENING_BALANCE }) ;
this.customer_d_Form.patchValue({last_invo_num :s[0].LAST_PAYED_INVO_NUM }) ;

}

else
  {
    alert('Select proper Input');
  }
}




get_customers()
{
  
  this.ds.get_customer_list_b2b()
  .subscribe((jsonData) => { this.getjson5(jsonData)
                      },(err) => console.error(err),
                    
                      );
}
getjson5(json :any)
  {
    console.log(json);
  this.arrayOfCusValues = json;
   
  
   
  }
  update_customer()
  {
   
    this.ds.update_customer(this.customer_d_Form.value)
     .subscribe((jsonData) => { this._res_up(jsonData)  
                      },(err) => console.error(err),
                       
                      );

  }

_res_up(json:any)
{
  alert(json.msg)
  this.router.navigate(['/dash']);
}


delete_customer()

{

   this.ds.delete_customer(this.customer_d_Form.value)
     .subscribe((jsonData) => { this._res_del(jsonData)  
                      },(err) => console.error(err),
                       
                      );

}

_res_del(json:any)
{
  alert(json.msg)
  this.router.navigate(['/dash']);
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




   
}