export default class Product {
    id: number; 
    name: string; 
    description: string;
    price: number;
    stock: number;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
  
  
      constructor (){
          this.id = 0;
          this.name = "";
          this.description = "";
          this.price = 0;
          this.stock = 0;
          this.isDeleted = false;
          this.createdAt = new Date();
          this.updatedAt = new Date();
      }
      
}