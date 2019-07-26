import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';
import { AuthenticationService } from '../services/login.service';
import { User_role } from '../services/user_role';
import { AuthGuard } from '../services/auth.guard';

@Component({
  selector: 'app-home',
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent implements OnInit {
 

 
   loginForm: FormGroup;
   isclicked : boolean= false;
  constructor( private router: Router,private fb: FormBuilder, private aS: AuthenticationService , private ag: AuthGuard , private ur : User_role) {   }
  ngOnInit()  {
    this.isclicked=false;
   this.loginForm = this.fb.group({
            username: [''],
            password: ['']             
                                      });

  }
    


  login(){
  
  this.isclicked = true;
    this.aS.login(this.loginForm.value)
     .subscribe((jsonData) => { this.getjson(jsonData)
                      },(err) => console.error(err),
                    
                      );

  }


   
  getjson(json :any)
  {
    
    console.log('json',json)
   
   if (json.success === false)
   {
      alert(json.msg);

   }

   else  
   {
     if(json.msg === 'user logged')
     {
      this.ag.token = true;
      this.ur.admin = false;
      this.router.navigate(['/dash']);

     }
     else if(json.msg === 'Admin logged')
     {
      this.ag.token = true;
      this.ur.admin = true;
      this.router.navigate(['/dash']);

     }
  
   }

 

   
  }
}

