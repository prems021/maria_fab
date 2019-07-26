import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-greeting',
  templateUrl: './main.html',
  styleUrls: ['./main.css']
})
export class Greeting_Component  {
  greetnewForm: FormGroup;
  greetupdateForm: FormGroup;
  greets: any [] = [];
  optionS : any
 ngOnInit() {

       this.get_greets();
      this.greetnewForm = this.fb.group({ 

      greet : ''
     
    });

        this.greetupdateForm = this.fb.group({ 

      option : ''
     
    });
   
  }
  constructor(private fb: FormBuilder,private router: Router,private ds: DataService ) { }
  
 
  get_greets()
  {
      this.ds.get_greetings()
      .subscribe((jsonData) => { this.getgreet(jsonData)
                      },(err) => console.error(err)
                      
                      );

  }

  add()
  {
     console.log(this.greetnewForm.value); 
       this.ds.add_new_greeting(this.greetnewForm.value)
         .subscribe((jsonData) => { this.getjson(jsonData)
                        },(err) => console.error(err)
                      
                     ); 

  }

  update(g:any)
   {
  
    
     
  this.ds.update_default_greeting(this.greetnewForm.value)
      .subscribe((jsonData) => { this.getjson(jsonData)
                       },(err) => console.error(err)
                      
                       );

   

  }
getjson(jso : any)
{
  alert(jso.msg);
  this.router.navigate(['/dash']);

}

getgreet(msi : any)
{
  console.log(msi);
   for( var i = 0 ; i < msi.length; i++)
  this.greets[i] = msi[i].GREETTING;


}
 

}