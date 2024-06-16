import ProductOfUserRepository from "../../domain/ports/productoofuser-repository.port";
import UserRepository from "../../domain/ports/user-repository.port";
import ProductoRepository from "../../domain/ports/producto-repository.port";
import SpecificProductoRepository from "../../domain/ports/specificProducto-repository.port";
import Pagination from "../../types/paginate.type";
import User from "../../domain/entities/user.entity";
import bcrypt from "bcrypt"
import "dotenv/config"
export default class UserRegisterUseCase {
  private userRepository:UserRepository;
  private productofuserrepository:ProductOfUserRepository;
  private productoRepository:ProductoRepository;
  private specificproductrepository:SpecificProductoRepository;
  
  constructor (userRepository:UserRepository,productofuserrepository:ProductOfUserRepository,productoRepository:ProductoRepository,specificproductrepository:SpecificProductoRepository){
    this.userRepository=userRepository;
    this.productofuserrepository=productofuserrepository;
    this.productoRepository=productoRepository;
    this.specificproductrepository=specificproductrepository;
  }

  public async register(user:User,codigoproducto:string):Promise<void>{
    try{
       
      user.password=bcrypt.hashSync(user.password,Number(process.env.SALT as string))

        const findexists=await this.specificproductrepository.findByCodigo(codigoproducto.toLowerCase())

        if(!findexists){
          throw new Error("Specific product not found")
        }
        const newUser=await this.userRepository.save(user)
        
        const dinporductofuser=await this.productofuserrepository.findBySpecificProduct(codigoproducto)
        console.log(dinporductofuser)
        if(Array.isArray(dinporductofuser)){
      
            if(dinporductofuser.length>0){
             
               await this.productofuserrepository.save({
                id:0,
                idspecificproduct:codigoproducto,
                userId:newUser.id,
                createdAt:new Date(),
                updatedAt:new Date(),
                createdBy:newUser.id,
                updateby:0,
                isDeleted:false
               })
             
            }
            const findprdocut=await this.specificproductrepository.findByCodigo(codigoproducto)
           
            await this.productoRepository.updateStock({
                id:findprdocut.productId,
                isDeleted:false,
                createdAt:new Date(),
                updatedAt:new Date(),
                name:"",
                description:"",
                stock:0,
                price:0
            
            })
            console.log(newUser.id)
            await this.productofuserrepository.save({
              id:0,
              idspecificproduct:codigoproducto,
              userId:newUser.id,
              createdAt:new Date(),
              updatedAt:new Date(),
              createdBy:newUser.id,
              updateby:0,
              isDeleted:false
             })


            
        }
        

        

    }catch(e){
      console.error(e)
      throw new Error("Error saving user")
    }
  }

  
}