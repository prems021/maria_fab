
export class expense_slave
{
constructor(
          public SI_NO: number,
          public CATEGORY : string,
          public ARTICLE_CODE : string,
          public SPECS : string,
          public DESCRIPTION : string,
          public BRAND : string,
          public QTY : number,
          public UNIT: string,
          public PRICE : number,
          public NET_PRICE : number,
          public HSN_CODE : string

        
          
          
) { }
}

export class pdt_array
{
constructor(
          public SI_NO: number,
          public DESCRIPTION: string,
          public CATEGORY : string,
          public HSN_CODE : string,
          public ARTICLE_CODE : string,
          public SPECS : string,
          public BRAND : string,
          public QTY : number,
          public UNIT: string,         
          public PRICE : number,
          public NET_PRICE : number

        
          
          
) { }
}








   export class exp_invo {
  constructor(
  
  public  E_ENTRY_NUMBER: number,
  public  E_CATEGORY : string,
  public  LENGTH : number,
  public  ITEMS :expense_slave[],
  public  VENDOR : string,
  public  STREET : string,
  public  BILL_NO : number,
  public CGST : number,
  public IGST : number,
  public SGST : number,
  public  GRAND_TOTAL : number,
  public  DATE : string,
  public REMARKS : string,
    public GST_IN : string

  ) {}
}


export class product_model 
{
constructor(
          
          public PRODUCT_NAME: string,
          public PRODUCT_CODE: string,
          public NET_PRICE: number,
          public QUANTITY : number,
          public TAX: number,
          public AVAIL_QTY : number,
          public NET_PURCHASE_PRICE :number,
          public UNIT : string,
         
          
) { }
}



export class vendor_model 
{
constructor(
          
          public CITY: string,
          public CREDIT_BALANCE: number,
          public CUSTOMER_NAME: string,
          public GSTIN : string,
          public IS_VENDOR : boolean,
          public LAST_PAYED_INVO_NUM : number,
          public MOBILE : number,
          public OPENING_BALANCE: number,
          public AVAIL_QTY : number,
          public PHONE :number,
          public STREET : string,
          
         
          
) { }
}


