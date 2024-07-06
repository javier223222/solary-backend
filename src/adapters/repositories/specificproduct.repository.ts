import SpecificProduct from "../../domain/entities/specificproduct.entity";
import SpecificProductoRepository from "../../domain/ports/specificProducto-repository.port";
import { db } from "../../infrastructure/database/data-source";
import Pagination from "../../types/paginate.type";

export default class SpecificProductoRepositoryAdapter implements SpecificProductoRepository {
    public async find(page?: number | undefined, limit?: number | undefined): Promise<any[] | Pagination> {
        try{
            if(!page && !limit){
                return await db.specifProduct.findMany({
                    where:{
                        isDeleted:false
                    },
                    select:{
                        codigo:true,
                        productoId:true,
                        isDeleted:true,
                        createdAt:true,
                        updatedAt:true,
                        createdBy       :true,
                        updatedBy       :true,
                        producto:{
                            select:{
                                id:true,
                                isDeleted:true,
                                createdAt:true,
                                updatedAt:true,
                                nombre:true,
                                descripcion:true,
                                stock:true
                            }
                        }
                    }
                })
            }else if(page && limit){
            const total=await db.specifProduct.count({
                where:{
                    isDeleted:false
                }

            })
            const ttotalpages=Math.ceil(total/limit)
            const data= await db.specifProduct.findMany({
                take:limit,
                skip:(page-1)*limit,
                where:{
                    isDeleted:false
                },
                select:{
                    codigo:true,
                    productoId:true,
                    isDeleted:true,
                    createdAt:true,
                    updatedAt:true,
                    createdBy       :true,
                    updatedBy       :true,
                    producto:{
                        select:{
                            id:true,
                            isDeleted:true,
                            createdAt:true,
                            updatedAt:true,
                            nombre:true,
                            descripcion:true,
                            stock:true
                        }
                    }
                }
            })
            return {
                totalItems:data.length,
                totalPages:ttotalpages,
                currentPage:page,
                data:data,
                limit:limit
            }
        }
        return []
        }catch(e:any){
            throw new Error("Error finding specific product")
        }
        
    }
    public async findByCodigo(codigo: string): Promise<SpecificProduct> {
        try{
            const result=await db.specifProduct.findFirst({
                where:{
                    isDeleted:false,
                    codigo:codigo
                },
                select:{
                    codigo:true,
                    productoId:true,
                    isDeleted:true,
                    createdAt:true,
                    updatedAt:true,
                    createdBy       :true,
                    updatedBy       :true,
                    producto:{
                        select:{
                            id:true,
                            isDeleted:true,
                            createdAt:true,
                            updatedAt:true,
                            nombre:true,
                            descripcion:true,
                            stock:true
                        }
                    }
                }
            })
            return {
                isDeleted:result!.isDeleted,
                codigo:result!.codigo,
                productId:result!.productoId,
                createdAt:result!.createdAt,
                updatedAt:result!.updatedAt,
                createdById:result!.createdBy,

                updatedById:result!.updatedBy


            }

        }
        catch(e:any){
            throw new Error("Error finding specific product by code")
        }
    }
   public async  findByProductId(id: number): Promise<any> {
        try{
          
            return await db.specifProduct.findFirst({
                where:{
                    isDeleted:false,
                    productoId:id
                },
                select:{
                    codigo:true,
                    productoId:true,
                    isDeleted:true,
                    createdAt:true,
                    updatedAt:true,
                    createdBy       :true,
                    updatedBy       :true,
                    producto:{
                        select:{
                            id:true,
                            isDeleted:true,
                            createdAt:true,
                            updatedAt:true,
                            nombre:true,
                            descripcion:true,
                            stock:true
                        }
                    },
                    productosOfUser:{
                        select:{
                            id:true,
                            userId:true,
                            user:{
                                select:{
                                    id:true,
                                    isDeleted:true,
                                    createdAt:true,
                                    updatedAt:true,
                                    
                                    name:true,
                                    email:true
                                }
                            }
                        }
                    
                    }
                }
            })
        }catch(e:any){
            throw new Error("Error finding specific product by product id")
        }
    }
    public async save(spsceficproducto: SpecificProduct): Promise<void> {
        try{
            await db.specifProduct.create({
                data:{
                    codigo:spsceficproducto.codigo,
                    productoId:spsceficproducto.productId,
                    isDeleted:false,
                    createdAt:new Date(),
                    updatedAt:new Date(),
                    createdBy:spsceficproducto.createdById,
                    updatedBy:spsceficproducto.updatedById
                }
            })


        }catch(e:any){
            throw new Error("Error saving specific product")
        }
        
    }
    public async delete(codigo: string): Promise<void> {
        try{
           
            await db.specifProduct.update({
                where:{
                    codigo:codigo
                },
                data:{
                    isDeleted:true
                }
            })
        }catch(e:any){
            throw new Error("Error deleting specific product")
        }
        
    }
    public async fisicalDelete(codgi: string): Promise<void> {
        try{
            await db.specifProduct.delete({
               where:{
                     codigo:codgi
               }
            })

        }catch(e:any){
            throw new Error("Error fisical deleting specific product")
        }
    }
    
 public async update(codigo: string, newcodigo: string): Promise<void> {
    try{
        await db.specifProduct.update({
            where:{
                codigo:codigo
            },
            data:{
                codigo:newcodigo
            }
        })

    }catch(e:any){
        throw new Error("Error updating specific product")
    }
     
 }
public async updateidproducto(codigo: string, productoId: number): Promise<void> {
    try{
        await db.specifProduct.update({
            where:{
                codigo:codigo
            },
            data:{
                productoId:productoId
            }
        })

    }catch(e:any){
        throw new Error("Error updating specific product id")
    }
     
 }
    

}