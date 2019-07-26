import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';

import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-admin-invoice-string',
  templateUrl: './main.html',
  styleUrls: ['./main.css']
})
export class Admin_Invoice_string_mainComponent  {
  
  stringnewForm: FormGroup;
  stringupdateForm: FormGroup;
  strings: any [] = [];
  optionS : any

 ngOnInit() {
   this.get_invoice_string_list();
   this.stringnewForm = this.fb.group({ 

    new_string : ''
   
  });

      this.stringupdateForm = this.fb.group({ 

    option : ''
   
  });
  }
  constructor(private fb: FormBuilder,private router: Router, private ds: DataService ) { }
  
  get_invoice_string_list()
  {

    this.ds.get_invoice_string_list()
    .subscribe((jsonData) => { this.get_invoice_string_list_res(jsonData)  
    },(err) => console.error(err)
     
    );

  }
  get_invoice_string_list_res(json:any)
  {
     console.log('json',json);
     for( var i = 0 ; i < json.length; i++)
     this.strings[i] = json[i].STRING_NAME;
  }


add()
{
  this.ds.add_to_invoice_string_list(this.stringnewForm.value)
    .subscribe((jsonData) => { this.add_invoice_string_list_res(jsonData)  
  },(err) => console.error(err)
   
  );
}

add_invoice_string_list_res(json:any)
{
  alert(json.msg);
}

update(x:any)
{
  this.ds.set_default_to_invoice_string_list(this.stringupdateForm.value)
  .subscribe((jsonData) => { this.getjson_update(jsonData)
                   },(err) => console.error(err)
                  
                   );
}
getjson_update(json:any)
{
  alert(json.msg);
}


}