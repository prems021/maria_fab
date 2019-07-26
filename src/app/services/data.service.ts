import { Injectable } from '@angular/core';
import { Http, Headers, Response,RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { contentHeaders } from './headers' ;
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class DataService {

    total = 0;
    
    
  

    
    constructor(private http: Http) { }


    update_purchase(model:any)
    {
      let body = JSON.stringify(model); 
      console.log('b',body)
      return this.http.post('https://fv9do.sse.codesandbox.io/api/post/update_purchase',body,{headers : contentHeaders})  
      .map((res: Response) => res.json())
    }



     get_expence_details(model:any)
    {
      let body = JSON.stringify(model); 
      console.log('b',body)
      return this.http.post('https://fv9do.sse.codesandbox.io/api/public/get_expence_details',body,{headers : contentHeaders})  
      .map((res: Response) => res.json())
    }



    get_product_categories()
    {
       return this.http.get('https://fv9do.sse.codesandbox.io/api/public/get_product_categories',{headers : contentHeaders})  
         .map((res: Response) => res.json())       

    }


     get_purchases()
    {
      return this.http.get('https://fv9do.sse.codesandbox.io/api/public/get_purchases',{headers : contentHeaders})  
         .map((res: Response) => res.json())
    }

    get_audit_report_ret(model:any)
    {
        let body = JSON.stringify(model); 
      console.log('b',body)
      return this.http.post('https://fv9do.sse.codesandbox.io/api/public/auditor_report_return',body,{headers : contentHeaders})  
      .map((res: Response) => res.json())
    }

    get_audit_report_b2c(model:any)
    {
        let body = JSON.stringify(model); 
      console.log('b',body)
      return this.http.post('https://fv9do.sse.codesandbox.io/api/public/auditor_report',body,{headers : contentHeaders})  
      .map((res: Response) => res.json())
    }

    backup()
    {
   
      return this.http.get('https://fv9do.sse.codesandbox.io/api/user/backup',{headers : contentHeaders})  
         .map((res: Response) => res.json())
    }


    post_a_return(model:any)
    {
      let body = JSON.stringify(model); 
      console.log('b',body)
      return this.http.post('https://fv9do.sse.codesandbox.io/api/post/post_a_return',body,{headers : contentHeaders})  
      .map((res: Response) => res.json())

    }
    get_product_category()
    {
      
      return this.http.get('https://fv9do.sse.codesandbox.io/api/public/get_product_cat_list',{headers : contentHeaders})  
      .map((res: Response) => res.json())
    }

    add_product_category(model:any)
    {
      let body = JSON.stringify(model); 
      console.log('b',body)
      return this.http.post('https://fv9do.sse.codesandbox.io/api/public/add_product_category',body,{headers : contentHeaders})  
      .map((res: Response) => res.json())
    }


       get_invoice_string_list()
    {
      
        return this.http.get('https://fv9do.sse.codesandbox.io/api/public/get_invoice_string_list',{headers : contentHeaders})  
         .map((res: Response) => res.json())
    
    }

        add_to_invoice_string_list(model:any)
    {
      let body = JSON.stringify(model);
      
        return this.http.post('https://fv9do.sse.codesandbox.io/api/public/add_to_invoice_string_list',body,{headers : contentHeaders})  
         .map((res: Response) => res.json())
    
    }
   
       set_default_to_invoice_string_list(model:any)
    {
      let body = JSON.stringify(model);
        console.log('bo',body)
        return this.http.post('https://fv9do.sse.codesandbox.io/api/public/set_default_to_invoice_string_list',body,{headers : contentHeaders})  
         .map((res: Response) => res.json())
    
    }

      get_default_invoice_string()
    {
      
        return this.http.get('https://fv9do.sse.codesandbox.io/api/public/get_default_invoice_string',{headers : contentHeaders})  
         .map((res: Response) => res.json())
    
    }
  
    get_a_invoice(model:any)
    {
        let body= JSON.stringify(model); 
       
        return this.http.post('https://fv9do.sse.codesandbox.io/api/public/get_a_invoice',body,{headers : contentHeaders})  
        .map((res: Response) => res.json())
     
    }

    get_a_invoice_return(model:any)
    {
        let body= JSON.stringify(model); 
       
        return this.http.post('https://fv9do.sse.codesandbox.io/api/public/get_a_invoice_return',body,{headers : contentHeaders})  
        .map((res: Response) => res.json())
     
    }

    get_cus_slave_report(model:any)
    {
     
       let body= JSON.stringify(model); 
     
      return this.http.post('https://fv9do.sse.codesandbox.io/api/public/cus_slave_report',body,{headers : contentHeaders})  
      .map((res: Response) => res.json())
    }
   
   get_master_cus_report(model:any)
   {
      let body= JSON.stringify(model); 
       
      return this.http.post('https://fv9do.sse.codesandbox.io/api/public/cus_mas_report',body,{headers : contentHeaders})  
      .map((res: Response) => res.json())
   }
   
   get_reciept_number_b2b()
    {
      return this.http.get('https://fv9do.sse.codesandbox.io/api/public/get_reciept_number_b2b',{headers : contentHeaders})  
      .map((res: Response) => res.json())
    }


  get_payment_number_b2b()

  {
     return this.http.get('https://fv9do.sse.codesandbox.io/api/public/get_payment_number_b2b',{headers : contentHeaders})  
      .map((res: Response) => res.json())

  }

    post_cash_reciept(model:any)
    {
       let body= JSON.stringify(model); 
        console.log('body',body)
      return this.http.post('https://fv9do.sse.codesandbox.io/api/public/post_cash_reciept',body,{headers : contentHeaders})  
      .map((res: Response) => res.json())
    }



  post_cash_reciept_on_bill(model:any)
  {

     let body= JSON.stringify(model); 
        console.log('body',body)
      return this.http.post('https://fv9do.sse.codesandbox.io/api/public/post_cash_reciept_on_bill',body,{headers : contentHeaders})  
      .map((res: Response) => res.json())

  }

    
     get_sales_report(model : any)
 {

     let body= JSON.stringify(model); 
       console.log('body',body);
      return this.http.post('https://fv9do.sse.codesandbox.io/api/public/sales_report',body,{headers : contentHeaders})  
      .map((res: Response) => res.json())
 } 

 get_report_expense(model: any)
  {

     let body = JSON.stringify(model); 
       console.log('body',body);
      return this.http.post('https://fv9do.sse.codesandbox.io/api/public/get_report_expense',body,{headers : contentHeaders})  
      .map((res: Response) => res.json())

  }     

 get_report_purchase(model: any)
  {

     let body = JSON.stringify(model); 
       console.log('body',body);
      return this.http.post('https://fv9do.sse.codesandbox.io/api/public/reports_purchase',body,{headers : contentHeaders})  
      .map((res: Response) => res.json())

  }  


    get_report_revenue(model: any)
  {

     let body = JSON.stringify(model); 
       console.log('body',body);
      return this.http.post('https://fv9do.sse.codesandbox.io/api/public/reports_revenue',body,{headers : contentHeaders})  
      .map((res: Response) => res.json())

  }  
  
   
  save_other_expense(model:any)
  {
     let body = JSON.stringify(model); 
       
      return this.http.post('https://fv9do.sse.codesandbox.io/api/public/add_other_expence_entry',body,{headers : contentHeaders})  
      .map((res: Response) => res.json())

  }

    get_customer_list()
     {
    
      return this.http.get('https://fv9do.sse.codesandbox.io/api/public/list_customers',{headers : contentHeaders})  
      .map((res: Response) => res.json())
   
     }


     get_customer_only_list()
       {
    
      return this.http.get('https://fv9do.sse.codesandbox.io/api/public/list_only_customers',{headers : contentHeaders})  
      .map((res: Response) => res.json())
   
     }



     get_cus_cr_report(model : any)
 {

     let body= JSON.stringify(model); 
       return this.http.post('https://fv9do.sse.codesandbox.io/api/public/cus_rep_deb_cr',body,{headers : contentHeaders})  
      .map((res: Response) => res.json())
 }   


get_purchase_report(model:any)
{
  let body= JSON.stringify(model); 
       return this.http.post('https://fv9do.sse.codesandbox.io/api/public/get_purchase_report',body,{headers : contentHeaders})  
      .map((res: Response) => res.json())
}

    get_exp_type_list()
    {
            return this.http.get('https://fv9do.sse.codesandbox.io/api/public/list_expence_category',{headers : contentHeaders})  
      .map((res: Response) => res.json())
    }


   get_party_list()
   {
      return this.http.get('https://fv9do.sse.codesandbox.io/api/public/list_party',{headers : contentHeaders})  
      .map((res: Response) => res.json())
   }

    get_exp_rec_no()
     {
      return this.http.get('https://fv9do.sse.codesandbox.io/api/public/get_exp_rec_no',{headers : contentHeaders})  
      .map((res: Response) => res.json())
     }

     add_purchase_entry(model : any)
     {

    let body = JSON.stringify(model); 
    console.log('pu',body)
      
      return this.http.post('https://fv9do.sse.codesandbox.io/api/public/add_purchase_entry',body,{headers : contentHeaders})  
      .map((res: Response) => res.json())

      }   


    add_expense_category(model:any)
    {
      let body = JSON.stringify(model); 
      return this.http.post('https://fv9do.sse.codesandbox.io/api/public/add_expense_category',body,{headers : contentHeaders})  
      .map((res: Response) => res.json())
    }

    delete_customer(model:any)
    {
      let body = JSON.stringify(model); 
      console.log('body',body);
      return this.http.post('https://fv9do.sse.codesandbox.io/api/public/delete_customer',body,{headers : contentHeaders})  
      .map((res: Response) => res.json())
    }

    update_customer(model:any)
    {
      let body = JSON.stringify(model); 
      console.log('body',body);
      return this.http.post('https://fv9do.sse.codesandbox.io/api/public/update_customer',body,{headers : contentHeaders})  
      .map((res: Response) => res.json())
    }

    get_customer_list_all()
    {
        return this.http.get('https://fv9do.sse.codesandbox.io/api/public/get_customer_list_all',{headers : contentHeaders})  
         .map((res: Response) => res.json())
    }
      get_customer_list_b2b()
    {
        return this.http.get('https://fv9do.sse.codesandbox.io/api/public/get_customer_list_b2b',{headers : contentHeaders})  
         .map((res: Response) => res.json())
    }

    get_vendors_all()
    {
        return this.http.get('https://fv9do.sse.codesandbox.io/api/public/get_vendors_all',{headers : contentHeaders})  
         .map((res: Response) => res.json())
    }

    
     
    add_customer(model:any)
    {
         let body = JSON.stringify(model); 
         console.log('body',body);
      return this.http.post('https://fv9do.sse.codesandbox.io/api/public/add_customer',body,{headers : contentHeaders})  
      .map((res: Response) => res.json())
    }

    update_invoice(model:any)
    {
          let body = JSON.stringify(model); 
          console.table(body)
     
      return this.http.post('https://fv9do.sse.codesandbox.io/api/post/update_invoice_now',body,{headers : contentHeaders})  
      .map((res: Response) => res.json())
    }
     

      get_invoices_b2b(model:any)
    {
       let body = JSON.stringify(model); 
    
      return this.http.post('https://fv9do.sse.codesandbox.io/api/public/get_invoice_list_b2b',body,{headers : contentHeaders})  
         .map((res: Response) => res.json())
    }
    get_invoices_b2c(model:any)
     {
         let body = JSON.stringify(model); 
    
      return this.http.post('https://fv9do.sse.codesandbox.io/api/public/get_invoice_list_b2c',body,{headers : contentHeaders})  
         .map((res: Response) => res.json())
    }

    add_product(model:any)
    {
       let body = JSON.stringify(model); 
       console.log('de',body)
      return this.http.post('https://fv9do.sse.codesandbox.io/api/post/add_product',body,{headers : contentHeaders})  
      .map((res: Response) => res.json())
    }

 

    update_product(model:any)
    {
      let body = JSON.stringify(model); 
       console.log('de',body)
      return this.http.post('https://fv9do.sse.codesandbox.io/api/public/update_product',body,{headers : contentHeaders})  
      .map((res: Response) => res.json())
    }

     delete_product(model:any)
    {
      let body = JSON.stringify(model); 
       console.log('de',body)
          return this.http.post('https://fv9do.sse.codesandbox.io/api/public/delete_product',body,{headers : contentHeaders}) 
     
      .map((res: Response) => res.json())
    }



   get_product_list()
   {
     
      return this.http.get('https://fv9do.sse.codesandbox.io/api/public/get_product_list',{headers : contentHeaders})  
     .map((res: Response) => res.json())

   }

    get_active_taxes_only()
    {
      return this.http.get('https://fv9do.sse.codesandbox.io/api/public/get_active_taxes_only',{headers : contentHeaders})  
      .map((res: Response) => res.json())
    }
 

    get_active_taxes_on_edit(model:any)
    {
       let body = JSON.stringify(model); 
      return this.http.post('https://fv9do.sse.codesandbox.io/api/public/get_active_taxes_on_edit',body,{headers : contentHeaders})  
      .map((res: Response) => res.json())
    }

    disable_tax_cat(model:any)
    {
      let body = JSON.stringify(model); 
    
      return this.http.post('https://fv9do.sse.codesandbox.io/api/public/disable_tax_cat',body,{headers : contentHeaders})  
      .map((res: Response) => res.json())
    }

    enable_tax_cat(model:any)
    {
      let body = JSON.stringify(model); 
      
      return this.http.post('https://fv9do.sse.codesandbox.io/api/public/enable_tax_cat',body,{headers : contentHeaders})  
      .map((res: Response) => res.json())
    }

    get_tax_cat()
    {
      return this.http.get('https://fv9do.sse.codesandbox.io/api/public/get_tax_cat',{headers : contentHeaders})  
      .map((res: Response) => res.json())
    }

    add_tax_cat(model:any)
    {
      
      let body = JSON.stringify(model); 
   
      return this.http.post('https://fv9do.sse.codesandbox.io/api/public/add_tax_cat',body,{headers : contentHeaders})  
      .map((res: Response) => res.json())
    }

    get_greetings()
    {
      return this.http.get('https://fv9do.sse.codesandbox.io/api/public/get_greetings',{headers : contentHeaders})  
         .map((res: Response) => res.json())
    }
   
   add_new_greeting(model:any)
   {
     let body= JSON.stringify(model); 
      return this.http.post('https://fv9do.sse.codesandbox.io/api/post/add_new_greeting', body, { headers: contentHeaders})
            .map((res: Response) => res.json())
   }
   update_default_greeting(model:any)
   {
     let body= JSON.stringify(model); 
                 console.log('bodies',body);
      return this.http.post('https://fv9do.sse.codesandbox.io/api/post/update_default_greeting', body, { headers: contentHeaders})
            .map((res: Response) => res.json())
   }


       post_invoice(model:any) 
       {
        let body= JSON.stringify(model); 
                 console.log('mi',body)
      return this.http.post('https://fv9do.sse.codesandbox.io/api/post/post_invoice', body, { headers: contentHeaders})
            .map((res: Response) => res.json())
            
        } 

   get_figure(model:any)
  {
    
       let body = JSON.stringify(model); 
        return this.http.post('https://fv9do.sse.codesandbox.io/api/public/number_to_word',body,{headers : contentHeaders})  
      .map((res: Response) => res.json())
  }

   get_invo_number_b2b(model:any)
    {
         let body= JSON.stringify(model); 
                
         return this.http.post('https://fv9do.sse.codesandbox.io/api/public/get_invoice_number_b2b',body,{headers : contentHeaders})  
         .map((res: Response) => res.json())
    }
  
    get_invo_number_b2c(model:any)
    {  
       let body= JSON.stringify(model); 
                 
         return this.http.post('https://fv9do.sse.codesandbox.io/api/public/get_invoice_number_b2c',body,{headers : contentHeaders})  
         .map((res: Response) => res.json())
    }
    
    get_products_list()
    {
       return this.http.get('https://fv9do.sse.codesandbox.io/api/public/get_products_list',{headers : contentHeaders})  
      .map((res: Response) => res.json())
    }
 
 


   get_customers_list_b2b()
   {
     return this.http.get('https://fv9do.sse.codesandbox.io/api/public/get_customers_list_b2b',{headers : contentHeaders})  
      .map((res: Response) => res.json())
   }

    adduser(model:any) {

        let body= JSON.stringify(model); 

        
        return this.http.post('https://fv9do.sse.codesandbox.io/api/public/add_user', body, { headers: contentHeaders})
            .map((response: Response) => {
                
                
                {
                    let postr = response.json();
                   console.log('responce=',postr)
                    
                }
            })   .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
            
            
                    }


  
 
 


    private handleError(error: any): Promise<any> 
  {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
