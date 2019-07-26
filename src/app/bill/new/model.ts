export class invo_slave 
{
constructor(
          public SI_NO : number,
          public PRODUCT_NAME : string,
          public QTY : number,
          public HSN_CODE : number,
          public UNIT : string,
          public PRICE : number,
          public TAX : number,
          public NET_PRICE : number,
          
          



          
) { }
}

export class pdt_model 
{
constructor(
          public SI_NO : number,
          public DESCRIPTION : string,
          public QTY : number,
          public ARTICLE_CODE : string,
          public SPECIFICATION : string,
          public CATEGORY : string,
          public BRAND_NAME : string,
          public UNIT : string,
          public PRICE : number,
          public TAX : number,
          public NET_PRICE : number,
          
                    
) { }
}





   export class invoice {
  constructor(
  
  public  INVOICE_NUMBER: number,
  public  length : number,
  public  items:invo_slave[],
  public  sub_total: number,
  public  grand_total: number,
  public  is_b2b : boolean,
  public  tran_type : number,
 
  
  


  ) {} }

 export class i_number {
  constructor(
    
    public text : string,
        public count: number

    
    
  ) {  }
}

 




    export class figure {
  constructor(
  
 public    number_to_convert: number,
 public fraction : number,

  public  msg: string
 
  


  ) {} }

    export class tax_deri {
  constructor(
  
 public   SI: number,
 public deri : dets[]

  

  ) {} }

    export class dets {
  constructor(
  
 public SI: number,
 public HSN : string,
 public TAX : number,
 public TAXABLE_VALUE : number,
 public CT_RATE : number,
 public CT_AMT : number,
 public ST_RATE : number,
 public ST_AMT : number,
 public TOT_AMT : number,
 
 
  


  ) {} }



    export class hsn_array {
  constructor(
  
 public   SI: number,
 public   hsn : string[]

  

  ) {} }




    
