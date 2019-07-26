import { Component, OnInit, Input, OnChanges,SimpleChanges, ViewChild, EventEmitter, Output  } from '@angular/core';
import { Router } from '@angular/router';
import { SharingService } from '../../services/sharing.service';
import { DataService } from '../../services/data.service';
import { tax_master } from './model';

@Component({
  selector: 'app-bill-sub-total-section',
  templateUrl: './sub_total.html',
  styleUrls: ['./sub_total.css']
})
export class Sub_total_Component implements OnChanges {

  @Input() sub_total : number;
  master_tax = new tax_master(0,[]);
  j : number = 0;
  z : number = 0;
  grand_total = 0;
  total_tax : number = 0;
  @Output() valueChange = new EventEmitter();
 
  

  
     constructor(private router: Router , private ss : SharingService , private ds : DataService) { }
  
 ngOnInit() {
                 this.clear_stack();
              //  this.get_active_taxes();
             
               
            }

  

  ngOnChanges(changes: SimpleChanges) {
    this.update_change();
  }

clear_stack()
{
  
  for(this.z=0; this.z<=this.ss.i_m.taxes.length;this.z++)
  {
    

    this.ss.i_m.taxes.pop();
   
  }
}


get_active_taxes()
{
  this.ds.get_active_taxes_only().subscribe((jsonData) => { this._get_active_taxes_only(jsonData)  
    },(err) => console.error(err),);
}

_get_active_taxes_only(json:any)
{
  this.master_tax.active_count = json.length;
 for(this.j=0;this.j<json.length;this.j++)
  {
    
     this.tax_push();
     this.push_tax_det()
     this.master_tax.details[this.j].ID = this.j + 1;
     this.master_tax.details[this.j].TAX_NAME = json[this.j].TAX_DISPLAY_NAME;
     this.master_tax.details[this.j].TAX_RATE = json[this.j].TAX_RATE;
   
  }


}

update_change()
{
  this.grand_total = this.sub_total;
  this.total_tax = 0 ;
    for(this.j=0;this.j<this.master_tax.active_count;this.j++)
  {    
    
      this.ss.i_m.taxes[this.j].SI_NO = this.j;
     this.ss.i_m.taxes[this.j].TAX_NAME = this.master_tax.details[this.j].TAX_NAME;
     this.ss.i_m.taxes[this.j].TAX_RATE =  this.master_tax.details[this.j].TAX_RATE ;
    this.master_tax.details[this.j].TAX_AMT = (this.sub_total * this.master_tax.details[this.j].TAX_RATE )/100 ;
    this.master_tax.details[this.j].TAX_AMT =  Math.round(this.master_tax.details[this.j].TAX_AMT * 100) / 100;
    this.ss.i_m.taxes[this.j].TAX_AMT = this.master_tax.details[this.j].TAX_AMT;
    this.grand_total = this.grand_total + this.master_tax.details[this.j].TAX_AMT;
    this.total_tax = this.total_tax + this.master_tax.details[this.j].TAX_AMT;
  }
  this.grand_total = Math.round(this.grand_total * 100) / 100;
  this.ss.i_m.tails[0].GRAND_TOTAL = this.grand_total;
  this.total_tax =  Math.round(this.total_tax * 100) / 100;
  this.ss.i_m.tails[0].TOTAL_TAX = this.total_tax;
  this.valueChange.emit(this.grand_total);
}

tax_push()
{   
  this.master_tax.details.push({"ID":0,"IS_ACTIVE":true,"TAX_NAME":'',"TAX_RATE":0,"TAX_AMT":0})
}

push_tax_det()
{
  this.ss.i_m.taxes.push({SI_NO:1,TAX_NAME:'',TAX_DISPLAY_NAME:'',TAX_RATE:0,TAX_AMT:0,SCOPE:0,IS_B2B:false})

 
}

}