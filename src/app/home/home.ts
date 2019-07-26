import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/login.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponents implements OnInit {

server : number = 0;
myVar : any ;
     constructor(private router: Router, private ls: AuthenticationService) {
    
     
    
  }
  

  ngOnInit() {

   this.check_server();
  }



check_server()
{
  
 this.myVar = setInterval(() => {   

   if( this.server === 0)
  { 

    this.ls.server_status().subscribe((jsonData) => { this.getval2(jsonData)
                      },(err) => console.error(err),
                      
                      );
   }

  else
      {

             clearInterval(this.myVar);
      }
        
  
}, 2000);



  
  

  
}

 

getval2(s: any)
{

   

   if (s.msg === 'server running')
   {
       this.server = 1 ;    
       this.router.navigate(['/login']);
                     
   }        
              else {
                    this.router.navigate(['/']);
                    

                   }
                   s.msg = 'waiting';
}
}
