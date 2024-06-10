export default class User {
  id: number; 
  name: string; 
  lastname: string;
  username: string;
  email : string;
  password : string;
  isDeleted : boolean;
  createdAt: Date;
  updatedAt: Date;


    constructor (){
        this.id = 0;
        this.name = "";
        this.lastname = "";
        this.username = "";
        this.email = "";
        this.password = "";
        this.isDeleted = false;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
    

}