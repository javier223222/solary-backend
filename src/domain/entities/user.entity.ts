export default class User {
  id: number; 
  name: string; 
 
  email : string;
  password : string;
  isDeleted : boolean;
  createdAt: Date;
  updatedAt: Date;
  roleid: number;


    constructor (){
        this.id = 0;
        this.name = "";
 
        this.email = "";
        this.password = "";
        this.isDeleted = false;
        this.createdAt = new Date();
        this.updatedAt = new Date();
        this.roleid = 0;
    }
    

}