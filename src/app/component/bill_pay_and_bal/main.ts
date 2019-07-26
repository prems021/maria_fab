import { Component, OnInit, Input, OnChanges,SimpleChanges, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SharingService } from '../../services/sharing.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-bill-pay-bal-section',
  templateUrl: './main.html',
  styleUrls: ['./main.css']
})
export class Bill_pay_balance_Component implements OnChanges {

  @Input() grand_total : number;
 
  j : number = 0;
  
   total_due : number = 0
   total_paid : number = 0
   is_partial_pay : boolean = true;

  
     constructor(private router: Router , private ss : SharingService , private ds : DataService) { }
  
 ngOnInit() {

               
               
            }

 
  ngOnChanges(changes: SimpleChanges) {
    this.update_change();
  }




  on_focus_total_paid()
  {
   
     this.ss.i_m.tails[0].TOTAL_DUE = this.ss.i_m.tails[0].GRAND_TOTAL;

      
    
  }
  
  keyup_on_paid_today()
  {
      this.ss.i_m.tails[0].TOTAL_DUE = this.ss.i_m.tails[0].GRAND_TOTAL - ((this.ss.i_m.tails[0].TOTAL_PAID_TODAY-0) + (this.ss.i_m.tails[0].TOTAL_PRE_PAID-0)) ;
      this.ss.i_m.tails[0].TOTAL_DUE  =  Math.round(this.ss.i_m.tails[0].TOTAL_DUE * 100) / 100;
   
  }
  
  blur_paid_today()
  {
    this.ss.i_m.tails[0].TOTAL_DUE = this.ss.i_m.tails[0].GRAND_TOTAL - ((this.ss.i_m.tails[0].TOTAL_PAID_TODAY-0) + (this.ss.i_m.tails[0].TOTAL_PRE_PAID-0)) ;
  }
  
  update_change()
  {
    // this.on_focus_total_paid();
    this.ss.i_m.tails[0].GRAND_TOTAL = this.grand_total
    this.keyup_on_paid_today()
  }
  
  

 




 
}
