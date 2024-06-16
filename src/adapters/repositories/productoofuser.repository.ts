import { ProductOfUser } from "../../domain/entities/productofuser.entity";
import ProductOfUserRepository from "../../domain/ports/productoofuser-repository.port";
import { db } from "../../infrastructure/database/data-source";
import Pagination from "../../types/paginate.type";
export default class ProductOfUserRepositoryAdapter implements ProductOfUserRepository {

public async find(page?: number | undefined, limit?: number | undefined): Promise<Pagination|any[]> {
    try{
      if(page && limit){
        const total=await db.productosOfUser.count({
            where:{
                isDeleted:false
            }
        })
        const totalpages=Math.ceil(total/limit)
        const data=await db.productosOfUser.findMany({
            take:limit,
            skip:(page-1)*limit,
            where:{
                isDeleted:false
            }
        })
        return {
            data:data,
            limit:limit,
            currentPage:page,
            totalItems:total,
            totalPages:totalpages

        }


      }
      const result=await db.productosOfUser.findMany({
        where:{
          isDeleted:false
        }
      })
      return result
    }catch(e:any){
        throw new Error("Erro finding product of user")
    }
     
 }
 public async findById(id: number): Promise<ProductOfUser | null> {
    try{
        const result=await db.productosOfUser.findUnique({
            where:{
                id:id
            }
        })
        if(result){
            return {
                idspecificproduct:result.idSpecifProduct,
                id:result.id,
                isDeleted:result.isDeleted,
                userId:result.userId,
                updateby:result.updatedBy,
                createdBy:result.createdBy,
                createdAt:result.createdAt,
                updatedAt:result.updatedAt

            }
        }
        return null


    }catch(e:any){
        throw new Error("Erro finding product of user")
    }
     
 }
 public async findBySpecificProduct(codigo: string,page?: number | undefined, limit?: number | undefined): Promise<any[] | Pagination> {
    try{
       if(page&&limit){

        const total=await db.productosOfUser.count({
            where:{
                idSpecifProduct:codigo,
                isDeleted:false
            }
        })
        const totalpages=Math.ceil(total/limit)
        const data=await db.productosOfUser.findMany({
            take:limit,
            skip:(page-1)*limit,
            where:{
                idSpecifProduct:codigo,
                isDeleted:false
            }
        })
        return {
            data:data,
            limit:limit,
            currentPage:page,
            totalItems:total,
            totalPages:totalpages
        }


       }
         const result=await db.productosOfUser.findMany({
              where:{
                idSpecifProduct:codigo,
                isDeleted:false
              }
         })
         return result
    }catch(e:any){
        throw new Error("Erro finding product of user")
    }
     
 }
public async findByUserId(id: number,page?: number | undefined, limit?: number | undefined): Promise<any[] | Pagination> {
    try{
        if(page && limit){
          const total=await db.productosOfUser.count({
            where:{
                isDeleted:false,
                userId:id
            }
          })
          const totalpages=Math.ceil(total/limit)
          const data=await db.productosOfUser.findMany({
                take:limit,
                skip:(page-1)*limit,
                where:{
                    userId:id,
                    isDeleted:false
                }
            })
            return {
                data:data,
                limit:limit,
                currentPage:page,
                totalItems:total,
                totalPages:totalpages
            }
        }
        const result=await db.productosOfUser.findMany({
            where:{
                userId:id,
                isDeleted:false
            }
        })
        return result


    }catch(e:any){
        throw new Error("Erro finding product of user")
    }
     
 }
 public async save(productoOfUser: ProductOfUser): Promise<ProductOfUser> {
     try{
      const result= await db.productosOfUser.create({
        data:{
            userId:productoOfUser.userId,
            idSpecifProduct:productoOfUser.idspecificproduct,
            createdBy:productoOfUser.createdBy,
            updatedBy:productoOfUser.updateby

        },
        select:{
            id:true,
            idSpecifProduct:true,
            userId:true,
            isDeleted:true,
            createdAt:true,
            updatedAt:true,
            createdBy:true,
            updatedBy:true

        }
       })
       return {
        id:result.id,
        idspecificproduct:result.idSpecifProduct,
        userId:result.userId,
        isDeleted:result.isDeleted,
        createdAt:result.createdAt,
        updatedAt:result.updatedAt,
        createdBy:result.createdBy,
        updateby:result.updatedBy
       }
     }catch(e:any){
        console.error(e)
        throw new Error("Erro saving product of user")
     }
 }
 public async delete(id: number): Promise<ProductOfUser> {
    try{
        const result=await db.productosOfUser.update({
            where:{
                id:id
            },
            data:{
              isDeleted:true
            },
            select:{
                id:true,
                userId:true,
                idSpecifProduct:true,
                isDeleted:true,
                createdAt   :true,
                createdBy:true,
                updatedAt:true,
                updatedBy:true,

            }
        })
        return {
            id:result.id,
            userId:result.userId,
            idspecificproduct:result.idSpecifProduct,
            isDeleted:result.isDeleted,
            createdAt:result.createdAt,
            updatedAt:result.updatedAt,
            createdBy:result.createdBy,
            updateby:result.updatedBy
        }

    }catch(e:any){
        throw new Error("Erro deleting product of user")
    }
     
 }
 public async fisicalDelete(id: number): Promise<ProductOfUser> {
    try{
        const result=await db.productosOfUser.delete({
            where:{
                id:id
                
            },
            select:{
                id:true,
                userId:true,
                idSpecifProduct:true,
                isDeleted:true,
                createdAt   :true,
                createdBy:true,
                updatedAt:true,
                updatedBy:true,
            }
        })
        return {
            id:result.id,
            userId:result.userId,
            idspecificproduct:result.idSpecifProduct,
            isDeleted:result.isDeleted,
            createdAt:result.createdAt,
            updatedAt:result.updatedAt,
            createdBy:result.createdBy,
            updateby:result.updatedBy

        }

    }catch(e:any){
        throw new Error("Erro deleting product of user")
    }
     
 }
 
}