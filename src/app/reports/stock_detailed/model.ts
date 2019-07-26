export class sub_model 
{
constructor(
          
          public DESCRIPTION: string,
          public HSN_CODE: string,
          public AVAIL_QTY : number,
          public SALES_VALUE : number,
          public PURCHASE_VALUE : number
       
      
         
          
) { }
}


export class p_model 
{
constructor(
          
          public SI : number,
          public ITEMS : sub_model[]
      
         
          
) { }
}
