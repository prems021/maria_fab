






   export class invoices {
  constructor(
  
  public  heads:head[],
  public  items:items[],
  public  taxes:taxes[],
  public  flags:flag[],
  public  tails:tail[],
  public  configs:config[],
  public  varibs:varb[],
  public duplicates: duplicate[]



  ) {} }

  
export class items 
{
constructor(
          public SI_NO: number,
          public DESCRIPTION: string,
          public HSN_CODE: string,
          public ARTICLE_CODE: string,       
          public CATEGORY : string,
          public BRAND_NAME : string,
          public SPECIFICATION : string,       
          public QTY : number,
          public TAX : number,
          public PRICE: number,
          public UNIT : string,
          public NET_PRICE : number,
          public RATE_SUM : number,
          public ITEM_SUM : number,
          public IS_RETURN : boolean
          
          
) { }
}

export class taxes
{
constructor(
          public SI_NO: number,
          public TAX_NAME: string,
          public TAX_DISPLAY_NAME : string,
          public TAX_RATE: number,
          public TAX_AMT  : number,
          public SCOPE : number,
          public IS_B2B : boolean
          
          
) { }
}
  export class varb {
    constructor(
      public  I : number,
      public  K : number,
      public  Z : number,
    ) {}
  }


  export class head {
    constructor(
      
      public  INVOICE_NUMBER: number,
      public  INVOICE_STRING: string,
      public  BILL_DATE : string,
      public  CUSTOMER_NAME: string,
      public  CUSTOMER_CITY : string,
      public  CUSTOMER_STREET : string,
      public  CUSTOMER_GST_IN : string,
      public  CUSTOMER_PHONE : string,
      public  CUSTOMER_PHONE2 : string,
      public  CUSTOMER_PAN : string,
      public  TRANS_MODE : string,
      public  VEH_NO : string,
      public  PLACE_SUPPLY : string,
      public  BUNDLES : string,
      public  LPO : string,
      public  DN : string,
      public  CUS_DUE : number,
  
      
      
    ) {  }
  }

  export class tail {
    constructor(

  public  TOTAL_PAID_TODAY : number,
  public  TOTAL_PRE_PAID : number,
  public  SUB_TOTAL : number,
  public  TOTAL_TAX : number,
  public  TOTAL_CESS : number,
  public  GRAND_TOTAL : number,
  public OLD_GRAND_TOTAL : number,
  public GRAND_TOTAL_DIFF  : number,
  public  TOTAL_DUE : number,
  public  OLD_DUE : number
  
    ) {} }

  export class config {
    constructor(
      
      public  ITEM_LENGTH : number,
      public  ITEM_OLD_LENGTH : number,
      public  IS_B2B : boolean,
      public  IS_PARTIAL_PAY : boolean,
      public  IS_DEL_POSSIBLE : boolean ,
      public  IS_ON_UPDATE : boolean ,
      public  ACTIVE_TAX_COUNT : number
      
    
        
    ) {  }
  }

  export class flag {
    constructor(
      
      
      public  IS_INVO_NUMBER_LOADED : boolean,
      public  DATE_CHANGE_FLAG : number,
      public  IS_SERVER_RES : boolean ,
      public  CHANGE_OVER_FLAG : boolean,
      public  IS_PAYMENT_ON_BILL : boolean,
      public IS_PAYMENT_ON_UPDATE : boolean

     
        
    ) {  }
  }

  export class duplicate {
    constructor(
      
      
      public  IS_D : any,
      

     
        
    ) {  }
  }