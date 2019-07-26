

export class list {
  constructor(
    
         public si : number ,
         public item : sublist[],
        
       
      
    
  ) {  }
}


export class sublist 
{
 constructor(
public SI : number,
public INVOICE_NUMBER : number,
public BILL_DATE : string,
public ITEM_LENGTH : number,
public SUB_TOTAL : number,
public TAX_COLLECTED : number,
public GRAND_TOTAL : number,



  ) {  }
}


export class cashes {
  constructor(
    
         public si : number ,
         public item : subcash[],
        
       
      
    
  ) {  }
}


export class subcash 
{
 constructor(
public SI : number,
public RECIEPT_NO : number,
public CASH_DATE : string,
public IS_CASH_PAY : string,
public AMOUNT_PAYED : number,
public AMOUNT_DUE : number,
public CHEQUE_NO : number,
public CHEQUE_DATE : string,
public BANK_NAME : string



  ) {  }
}







export class cus_mas_report {
  constructor(
    
         public master : master,
         public slave : cash[]
        
           
  ) {  }
}



export class master 
{
constructor(
            public  INVOICE_NUMBER: number,
            public  GROSS_TOTAL: number,
            public  TOTAL_PAYED : number,
            public  TOTAL_DUE : number,
            public  IS_PARTIAL_PAY : boolean,
   
) { }
}







 export class cash {
  constructor(
  
  public  INVOICE_NUMBER: number,
  public  CUSTOMER_NAME: string,
  public INVOICE_DATE: string,
  public IS_CASH_PAY: boolean,
  public AMOUNT_PAYED : number,
  public cheque_no : number,
  public cheque_date : string,
  public bank : string,
  public createdAt : Date,
  


  ) {} }


export class Subporto
{
   constructor(
    public   PT_NUMBER: number,
    public  INVOICE_NUMBER: number,
    public  GROSS_TOTAL: number,
    public  TOTAL_PAYED : number,
    public  TOTAL_DUE : number,
    public  IS_PARTIAL_PAY : boolean,
    public   cash_items : cash[]
   ) { }

}


   export class Porto {
  constructor(
 
   public   items : Subporto[],
   
  ) {} }
