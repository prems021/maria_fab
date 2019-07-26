export class items {
  constructor(
    
         public si : number ,
         public item : sublist[]
        
       
      
    
  ) {  }
}


export class sublist 
{
 constructor(

public SI : number,
public INVOICE_NUMBER : number,
public BILL_DATE : string,
public CUSTOMER_NAME : string,
public CUSTOMER_GST_IN : string,
public SUB_TOTAL : number,
public TAX_COLLECTED : number,
public CESS_COLLECTED : number,
public GRAND_TOTAL : number


  ) {  }
}


export class items_r {
  constructor(
    
         public si : number ,
         public item : sublist_r[]
        
       
      
    
  ) {  }
}


export class sublist_r 
{
 constructor(


public ARTICLE_CODE: string,
public CATGERY: string,
public ID: number,
public INVOICE_NO: number,
public INVOICE_STRING: string,
public IS_B2B: boolean,
public PRICE: number,
public PRODUCT_DESCRIPTION: string,
public QUANTITY: number,
public RETURN_DATE: string,
public SI_NO: number,
public TAX: number,
public SI : number,
public TAX_AMT : number,
public CESS_AMT : number

  ) {  }
}

export class sublist_pur
{
 constructor(
public SI_NO : number,
public BILL_NO: number,
public CGST: number,
public EXPENCE_ENTRY_NO: number,
public EXP_DATE: string,
public IGST: number,
public SGST: number,
public TOTAL_AMOUNT: number,
public VENDOR: string,
public CUS_GST : string

  ) {  }
}


export class items_pur {
  constructor(
    
         public si : number ,
         public item : sublist_pur[]
        
       
      
    
  ) {  }
}
