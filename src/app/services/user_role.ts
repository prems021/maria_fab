import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class User_role implements CanActivate {
     
     public admin : boolean = false;
     
    constructor(private router: Router) { }

    canActivate() {
        if (this.admin == true) {
            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page
        this.router.navigate(['/login']);
        return false;
    }


   
}