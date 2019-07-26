import { Component,OnInit } from '@angular/core';
import {  UpdateService } from '../../services/update.service';
import {  ReportService } from '../../services/report.service';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup,FormControl, Validators} from '@angular/forms';

 import { items } from './model';
 import { items_r } from './model';
 import { items_pur } from './model';
 
 


@Component({
    selector: 'cus-auditor-report',
    templateUrl: './auditor.html',
    styleUrls: ['./auditor.css']
})
export class Auditor_statement {
  
 

   option : any;
   post_model : any = {option:false,from_date:'',to_date: '' }
   click : number = 0;

    post_invo = new items(1,[]);
    post_invo_r = new items_r(1,[]);
    post_invo_pur = new items_pur(1,[]);

    data : any [] =[];
    data2 : any[] = [];

    total_tax_ret : number = 0;
    total_tax_qty : number = 0;
   
  
   
    
    
    
    view : boolean = false;
    view1 : boolean = false;
    view3 : boolean = false;
    view7 : boolean = false;
    length2 : number = 0;
    length : number = 0;
    total_sub_total : number =0;
    total_tax : number =0;
    total_grand : number = 0;
    total_cess : number = 0;
     bool : boolean ;

     to_igst : number = 0;
     to_cgst : number = 0;
     to_sgst : number = 0;
     to_amt : number = 0;
    
 
    


    constructor( private fb: FormBuilder, private ds : DataService, 
      private uS: UpdateService, private rs: Router ,private Rs: ReportService ) {
       
    }
ngOnInit() {
   

   
  }

slide_change(x:any)
{
  
  if (x.checked === true)
   {
     this.post_model.option = true
   }

   else
   {

      this.post_model.option = false
   }
}

generate_report()
{
  this.click = 1;
   this.post_model.from_date = this.Rs.from_date;
   this.post_model.to_date = this.Rs.to_date;
  

   
       this.ds.get_audit_report_b2c(this.post_model)
       .subscribe((jsonData) => { this.getjson(jsonData)
                      },(err) => console.error(err),
                      
                      );


    this.ds.get_audit_report_ret(this.post_model)
       .subscribe((jsonData) => { this.getjson_ret(jsonData)
                      },(err) => console.error(err),
                      
                      );


       this.ds.get_purchase_report(this.post_model)
         .subscribe((jsonData) => { this.getjson_pur(jsonData)
                      },(err) => console.error(err),
                      
                      );



}

getjson_pur(json:any)
{
  console.log('pur',json);

    if(json.success === true)
      {
            for(var oo = 0 ; oo < json.data.length ; oo++)
              {
                  this.push_pur_item()
                  this.post_invo_pur.item[oo].SI_NO = oo+1;
                this.post_invo_pur.item[oo].BILL_NO = json.data[oo].BILL_NO
                this.post_invo_pur.item[oo].CGST = json.data[oo].CGST
                this.post_invo_pur.item[oo].EXPENCE_ENTRY_NO = json.data[oo].EXPENCE_ENTRY_NO
                this.post_invo_pur.item[oo].EXP_DATE = json.data[oo].EXP_DATE
                this.post_invo_pur.item[oo].IGST = json.data[oo].IGST
                this.post_invo_pur.item[oo].SGST = json.data[oo].SGST
                this.post_invo_pur.item[oo].CUS_GST = json.data[oo].CUS_GST
                this.post_invo_pur.item[oo].TOTAL_AMOUNT = json.data[oo].TOTAL_AMOUNT
                this.post_invo_pur.item[oo].VENDOR = json.data[oo].VENDOR
                
                this.to_igst = (this.to_igst-0) + (json.data[oo].IGST-0)
                 this.to_cgst = (this.to_cgst-0) + (json.data[oo].CGST-0)
                  this.to_sgst = (this.to_sgst-0) + (json.data[oo].SGST-0)
                  this.to_amt = (this.to_amt-0) + (json.data[oo].TOTAL_AMOUNT-0)
              }

      }


   this.view7 = true;
}


push_pur_item()
{
  this.post_invo_pur.item.push({SI_NO:0,BILL_NO:0,CGST:0,EXPENCE_ENTRY_NO:0,EXP_DATE:'',IGST:0,SGST:0,TOTAL_AMOUNT:0,VENDOR:'',CUS_GST:''})
}
         
getjson_ret(sss:any)
{
   console.log('ret_ data',sss);

   
   this.data2 = sss;
   this.length2 = this.data2.length;
    this.express_2(this.length2)
    

}


     getjson(ss:any) {

        
     this.data = ss;
     console.log('data.....',this.data);
     this.length = this.data.length;
   
   this.express(this.length)

         }

express_2(s:number)
{
   for(var i = 0; i < s ; i++)
       {

            this.auto_push_r();
          this.post_invo_r.item[i].SI = i+1;
          this.post_invo_r.item[i].ARTICLE_CODE = this.data2[i].ARTICLE_CODE
          this.post_invo_r.item[i].CATGERY = this.data2[i].CATGERY
          this.post_invo_r.item[i].ID = this.data2[i].ID
          this.post_invo_r.item[i].INVOICE_NO = this.data2[i].INVOICE_NO
          this.post_invo_r.item[i].INVOICE_STRING = this.data2[i].INVOICE_STRING
          this.post_invo_r.item[i].IS_B2B = this.data2[i].IS_B2B
          this.post_invo_r.item[i].PRICE = this.data2[i].PRICE
          this.post_invo_r.item[i].PRODUCT_DESCRIPTION = this.data2[i].PRODUCT_DESCRIPTION
          this.post_invo_r.item[i].QUANTITY = this.data2[i].QUANTITY
          this.post_invo_r.item[i].RETURN_DATE = this.data2[i].RETURN_DATE
          this.post_invo_r.item[i].SI_NO = this.data2[i].SI_NO
          this.post_invo_r.item[i].TAX = this.data2[i].TAX
          this.post_invo_r.item[i].TAX_AMT = ((this.data2[i].TAX *  this.data2[i].PRICE) * this.data2[i].QUANTITY)/100;

          if(this.data2[i].IS_B2B === false)
          {
            // this.post_invo_r.item[i].CESS_AMT = ((1 *  this.data2[i].PRICE) * this.data2[i].QUANTITY)/100;

          }
          else
          {
            //this.post_invo_r.item[i].CESS_AMT = 0;
          }
          this.post_invo_r.item[i].CESS_AMT = 0;
          
          this.total_tax_ret = (this.total_tax_ret-0) + (this.post_invo_r.item[i].TAX_AMT-0);
           this.total_tax_qty = (this.total_tax_qty-0) + (this.post_invo_r.item[i].QUANTITY-0);
       }
this.view1 = true;
}


 express(s: number)
  {
      
       for(var i = 0; i < s ; i++)
       {

  this.auto_push();
     this.post_invo.si = i;
     this.post_invo.item[i].INVOICE_NUMBER = this.data[i].INVOICE_NUMBER;
     this.post_invo.item[i].CUSTOMER_NAME = this.data[i].CUSTOMER_NAME;
     this.post_invo.item[i].BILL_DATE = this.data[i].BILL_DATE;
     this.post_invo.item[i].CUSTOMER_GST_IN = this.data[i].CUSTOMER_GST_IN;
     this.post_invo.item[i].SUB_TOTAL = (this.data[i].GRAND_TOTAL-0) -  (this.data[i].TAX_COLLECTED-0);
     this.post_invo.item[i].TAX_COLLECTED = this.data[i].TAX_COLLECTED;

     if(this.data[i].CESS_COLLECTED === null)
     {
      this.post_invo.item[i].CESS_COLLECTED = 0
     }
   else
   {
    this.post_invo.item[i].CESS_COLLECTED = this.data[i].CESS_COLLECTED;
   }
    
     this.post_invo.item[i].GRAND_TOTAL = this.data[i].GRAND_TOTAL;
     


 this.post_invo.item[i].SI = i+1;
 
 this.total_sub_total = (this.total_sub_total-0) + (this.data[i].SUB_TOTAL-0);
 
 this.total_tax = (this.total_tax-0) + (this.data[i].TAX_COLLECTED-0); 

   this.total_cess =   (this.total_cess-0) + (this.post_invo.item[i].CESS_COLLECTED-0) ;

 this.total_grand = (this.total_grand-0) + (this.data[i].GRAND_TOTAL-0); 


  
    this.view = true;
}

 
 }


   print_re()
  {
    window.print();
  }


 auto_push()
  {
       
        this.post_invo.item.push({ "SI":1,
         "INVOICE_NUMBER":1,"BILL_DATE":'',"CUSTOMER_NAME":'',
         "CUSTOMER_GST_IN" :'', "SUB_TOTAL":0,
          "TAX_COLLECTED" : 0,"CESS_COLLECTED":0,"GRAND_TOTAL":0 })

    

               }

               auto_push_r()
         {
       
        this.post_invo_r.item.push({ARTICLE_CODE:'',CATGERY:'',ID:0,INVOICE_NO:0,INVOICE_STRING:'',IS_B2B:false,PRICE:0,
        PRODUCT_DESCRIPTION:'',QUANTITY:0, RETURN_DATE:'',SI_NO:1, TAX:0,SI:0,TAX_AMT:0,CESS_AMT:0})

    

               }
}