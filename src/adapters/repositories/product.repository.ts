import Product from "../../domain/entities/product.entity";
import ProductoRepository from "../../domain/ports/producto-repository.port";
import { db } from "../../infrastructure/database/data-source";
import Pagination from "../../types/paginate.type";

export default class ProductoRepositoryAdapter implements ProductoRepository {
//    public async save(product: Product): Promise<void> {
//        try{
//               await db.producto.create({
//                 data:{
//                     nombre:product.name,
//                     descripcion:product.description,
//                     stock:product.stock,
//                     precio:product.price
//                 }
//               })

//        }catch(error){
//            throw new Error("Error saving product");
//        }
//    }
//     public async updateName(product: Product, name: string): Promise<void> {
//          try{
//               await db.producto.update({
//                 where:{
//                      id:product.id
//                 },
//                 data:{
//                      nombre:name
//                 }
//               })
//          }catch(error){
//               throw new Error("Error updating name");
//          }
//     }
//     public async updateDescription(product: Product, description: string): Promise<void> {
//          try{
//               await db.producto.update({
//                 where:{
//                      id:product.id
//                 },
//                 data:{
//                      descripcion:description
//                 }
//               })
//          }catch(error){
//               throw new Error("Error updating description");
//          }
//     }
//     public async updateStock(product: Product, stock: number): Promise<void> {
//          try{
//               await db.producto.update({
//                 where:{
//                      id:product.id
//                 },
//                 data:{
//                      stock:stock,
                     
//                 }
//               })
//          }catch(error){
//               throw new Error("Error updating stock");
//          }
//     }
//     public async delete(product: Product): Promise<void> {
//          try{
//               await db.producto.update({
//                 where:{
//                      id:product.id
//                 },
//                 data:{
//                      isDeleted:true
//                 }
//               })
//          }catch(error){
//               throw new Error("Error deleting product");
//          }
//     }
//     public async fisicalDelete(product: Product): Promise<void> {
//          try{
//               await db.producto.delete({
//                 where:{
//                      id:product.id
//                 }
//               })
//          }catch(error){
//               throw new Error("Error deleting product");
//          }
//     }
//     public async find(page?: number | undefined, limit?: number | undefined): Promise<Product[] | Pagination> {
//         try{
//             if(page && limit){
//                 const totalPorducts = await db.producto.count();
//                 const totalPages = Math.ceil(totalPorducts / limit);
//                 const products = await db.producto.findMany({
//                     take: limit,
//                     skip: (page - 1) * limit,select:{
//                         id:true,
//                         nombre:true,
//                         descripcion:true,
//                         precio:true,
//                         stock:true,
//                         isDeleted:true,
//                         updatedAt:true,
//                         createdAt:true

//                     }
//                 });
//                 return {
//                     data: products,
//                     currentPage: page,
//                     limit: limit,
//                     totalItems: products.length,
//                     totalPages: totalPages

//                 }
//             }

//         }catch(error){
//             throw new Error("Error finding product");
//         }
//     }
    
//    public async findById(id: number): Promise<Product | null> {
//         try{
//             const product = await db.producto.findUnique({
//                 where:{
//                     id:id
//                 },select:{
//                     id:true,
//                     nombre:true,
//                     descripcion:true,
//                     precio:true,
//                     stock:true,
//                     isDeleted:true,
//                     updatedAt:true,
//                     createdAt:true
//                 }
//             });
//            if(product){
//                return {
//                      id: product.id,
//                      name: product.nombre,
//                      description: product.descripcion,
//                      price: product.precio,
//                      stock: product.stock,
//                      isDeleted: product.isDeleted,
//                      createdAt: product.createdAt,
//                      updatedAt: product.updatedAt
                
//                }
//            }
//               return null;
             

//        }catch(error){
//             throw new Error("Error finding product");
//         }
//     }
//     public async findByName(name: string): Promise<Product | null> {
//         try{
//             const product = await db.producto.findFirst({
//                 where:{
//                      nombre:name
//                 },select:{
//                     id:true,
//                     nombre:true,
//                     descripcion:true,
//                     precio:true,
//                     stock:true,
//                     isDeleted:true,
//                     updatedAt:true,
//                     createdAt:true
//                 }
//             });
//             if(product){
//                 return {
//                      id: product.id,
//                      name: product.nombre,
//                      description: product.descripcion,
//                      price: product.precio,
//                      stock: product.stock,
//                      isDeleted: product.isDeleted,
//                      createdAt: product.createdAt,
//                      updatedAt: product.updatedAt
//                 }
//             }
//             return null;
//         }catch(error){
//             throw new Error("Error finding product");
//         }
        
//     }
    

     
    public async findByName(name: string): Promise<Product | null> {
        try{
            const product = await db.producto.findFirst({
                where:{
                     nombre:name
                }
            });
            if(product){
                return {
                     id: product.id,
                     name: product.nombre,
                     description: product.descripcion,
                     price: product.precio,
                     stock: product.stock,
                     isDeleted: product.isDeleted,
                     createdAt: product.createdAt,
                     updatedAt: product.updatedAt
                }
            }
            return null;

        }catch(error){
            throw new Error("Error finding product");
        }
    }
    public async save(product: Product): Promise<void> {
        try{
            await db.producto.create({
                data:{
                    nombre:product.name,
                    descripcion:product.description,
                    stock:product.stock,
                    precio:product.price
                    
                }
            })


        }catch(error){
            throw new Error("Error saving product");
        }
    }
    public async updateName(product: Product, name: string): Promise<void> {
        try{
         await db.producto.update({
            where:{
                id:product.id
            },
            data:{
                nombre:product.name
            }
         })
        }catch(error){
           throw new Error("Errro updating name")
        }
        
    }
    public async updateDescription(product: Product, description: string): Promise<void> {
        try{
         await db.producto.update({
            where:{
              id:product.id
            },
            data:{
                descripcion:product.description
            }
         })
        }catch(e:any){
         throw new Error("Error updating description")
        }
    }
    public async updateStock(product: Product): Promise<void> {
        try{
          const totalstocks=await db.producto.findUnique({
            where:{
                id:product.id
            }
          })
          await db.producto.update({
            where:{
                id:product.id,
            },
            data:{
                stock:Number(totalstocks?.stock)-1
            }
          })

        }catch(e:any){
            throw new Error("Error updating stock")
        }
    }
    public async delete(product: Product): Promise<void> {
        try{
            await db.producto.update({
                where:{
                    id:product.id
                },
                data:{
                    isDeleted:true
                }
            })

        }catch(e:any){
            throw new Error("Error deleting product")
        }
    }
    public async fisicalDelete(product: Product): Promise<void> {
        try{
         await db.producto.delete({
            where:{
                id:product.id
            }
         })
        }catch(e:any){
            throw new Error("Error deleting product")
        }
    }
    public async find(page?: number | undefined, limit?: number | undefined): Promise<Product[] | Pagination> {
        try{
            if(page && limit){
                const total=await db.producto.count({
                    where:{
                        isDeleted:false
                    }
                })

                const totalPages=Math.ceil(total/limit)
                const products=await db.producto.findMany({
                    skip:(page-1)*limit,
                    take:limit,
                    where:{
                        isDeleted:false
                    },
                    select:{
                        id:true,
                        nombre:true,
                        descripcion:true,
                        precio:true,
                        stock:true,
                        isDeleted:true,
                        updatedAt:true,
                        createdAt:true
                    }
                })
                return {
                    totalItems:products.length,
                    currentPage:page,
                    limit:limit,
                    totalPages:totalPages,
                    data:products
                }
            }
            const result=await db.producto.findMany({
                where:{
                    isDeleted:false,

                },
                select:{
                    id:true,
                    nombre:true,
                    descripcion:true,
                    precio:true,
                    stock:true,
                    isDeleted:true,
                    updatedAt:true,
                    createdAt:true
                }
            })
          const prodcuts:Product[]=[]
          result.map(result=>{
            prodcuts.push({
                id:result.id,
                name:result.nombre,
                description:result.descripcion,
                price:result.precio,
                stock:result.stock,
                isDeleted:result.isDeleted,
                createdAt:result.createdAt,
                updatedAt:result.updatedAt
            })
          })
          return prodcuts

        }catch(e:any){
            throw new Error("Error finding a product ")

        }
    }
   public async findById(id: number): Promise<Product | null> {
    try{
        const result=await db.producto.findUnique({
            where:{
                id:id
            }
        })

        if(!result){
            return null
        }
        const product:Product={
            id:result.id,
            name:result.nombre,
            description:result.descripcion,
            price:result.precio,
            stock:result.stock,
            isDeleted:result.isDeleted,
            createdAt:result.createdAt,
            updatedAt:result.updatedAt

        }
     return product
    }catch(e:any){
        throw new Error("Error finding a specific product ")
    }
        
    }
}