export default class SpecificProduct {
   codigo:string;
   productId:number;
   isDeleted:boolean;
   createdAt:Date;
   updatedAt:Date;
   createdById:number;
   updatedById:number;
    constructor (){
         this.codigo = "";
         this.productId = 0;
         this.isDeleted = false;
         this.createdAt = new Date();
         this.updatedAt = new Date();
         this.createdById = 0;
         this.updatedById = 0;
    }
    

}