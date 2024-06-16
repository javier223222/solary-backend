export class ProductOfUser {
    id:number
    userId:number
    idspecificproduct:string
    isDeleted:boolean
    createdAt:Date
    updatedAt:Date
    createdBy:number
    updateby:number

    constructor(){
        this.id = 0;
        this.userId = 0;
        this.idspecificproduct = "";
        this.isDeleted = false;
        this.createdAt = new Date();
        this.updatedAt = new Date();
        this.createdBy = 0;
        this.updateby = 0;
    }
}