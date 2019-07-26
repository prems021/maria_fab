import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/login.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-licence',
  templateUrl: './main.html',
  styleUrls: ['./main.css']
})
export class LicenceComponents implements OnInit {

server : number = 0;
myVar : any ;
     constructor(private router: Router, private ls: AuthenticationService) {
    
     
    
  }
  

  ngOnInit() {

   this.update_licence();
  }



update_licence()
{
  
 

  
  

  
}

 

getval2(s: any)
{

  
}

}