import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { DataService } from '../../services/data.service';
@Component({
  selector: 'app-tax-manage',
  templateUrl: './main.html',
  styleUrls: ['./main.css']
})
export class Tax_manageComponent implements OnInit {

  TaxForm: FormGroup;
  TaxForme: FormGroup;
  tax_name : string = '';
  tax_name_2 : string = '';
  tax_names : any [] = [];
  TaxForm_dis : FormGroup
 
  constructor( private fb: FormBuilder, private ds :DataService, private router : Router ) { } 

  ngOnInit() {
  
    this.TaxForm = this.fb.group({ 

      tax_name : '',
      tax_display_name : '',
      tax_rate : ''
          
    });
    this.TaxForme = this.fb.group({ 

      tax_name_e : '',

    });
    this.TaxForm_dis = this.fb.group({ 

      tax_name_d : '',

    });

document.getElementById("defaultOpen").click();
     // this.openCity('','London')
    // this.get_tax_cat();
  }

   get_tax_cat()
   {
    this.ds.get_tax_cat()
    .subscribe((jsonData) => { this.get_tax_cat_res(jsonData)  
                     },(err) => console.error(err)
                      
                     );
   }

  add_cat()
  {
   
    this.ds.add_tax_cat(this.TaxForm.value)
     .subscribe((jsonData) => { this.getval3(jsonData)  
                      },(err) => console.error(err)
                       
                      );

  }

   enable()
   {
   
    this.ds.enable_tax_cat(this.TaxForme.value)
    .subscribe((jsonData) => { this.getval_enable(jsonData)  
                     },(err) => console.error(err)
                      
                     );

   }

   disable()
   {
    this.ds.disable_tax_cat(this.TaxForm_dis.value)
    .subscribe((jsonData) => { this.getval_disable(jsonData)  
                     },(err) => console.error(err)
                      
                     );
   }

   get_tax_cat_res(json: any)
   {
     console.log(json);
    
     for( var i = 0 ; i < json.length; i++)
     {
     this.tax_names[i] = json[i].TAX_NAME;
     }
   
   }
   getval_disable(json :any)
   {
     
    console.log(json);
   if (json.msg ==='disabled')
   {
      alert('Updated sucessfully')
      this.router.navigate(['/dash']);
   }
   else
   {
    alert('Updatation failed')
    this.router.navigate(['/dash']);
   }
  }
  getval_enable(json :any)
  {
    
  console.log(json);
   if (json.msg ==='Enabled')
   {
      alert('Updated sucessfully')
      this.router.navigate(['/dash']);
   }
   else
   {
    alert('Updatation failed')
    this.router.navigate(['/dash']);
   }
 }


 getval3(json :any)
  {
    
  console.log(json);

      alert(json.msg)
      this.router.navigate(['/dash']);


  }



 openCity(evt, cityName) {
   console.log('evt',evt);
   console.log('cityName',cityName);
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

// Get the element with id="defaultOpen" and click on it
// document.getElementById("defaultOpen").click();



   
}