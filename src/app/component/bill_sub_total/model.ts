
  

    export class tax_master {
        constructor(
          
        
          public active_count: number,
          public details : tax_slave []
      
          
          
        ) {  }
      }

    export class tax_slave {
        constructor(
          
        
          public ID: number,
          public IS_ACTIVE : boolean,
          public TAX_NAME : string,
          public TAX_RATE : number,
          public TAX_AMT : number
      
          
          
        ) {  }
      }
   