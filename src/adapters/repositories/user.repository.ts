import User from "../../domain/entities/user.entity";
import UserRepository from "../../domain/ports/user-repository.port";
import { db } from "../../infrastructure/database/data-source";
import UpdateUser from "../../types/UpdateUser";
import Pagination from "../../types/paginate.type";

export default class UserRepositoryAdapter implements UserRepository {
   user: User;
    constructor(user: User) {
         this.user = user;
    }
    public async findBYEmail(email: string): Promise<User | null> {
      
        const result=await db.user.findFirst({
            where:{
                email:email,
                isDeleted:false,
                
                
            }
        })
        if(result){
            const user:User={
                id:result.id,
                roleid:result.roleId,
                name:result.name,
                email:result.email,
                password:result.password,
                isDeleted:result.isDeleted,
                createdAt:result.createdAt,
                updatedAt:result.updatedAt
            }
            return user;
        }
        return null;
    }
    public async save(user: User): Promise<User> {
        try{
          const newUser=  await db.user.create({
                data:{

                    roleId:user.roleid,
                    name:user.name,
                    email:user.email,
                    password:user.password,

                    
                },
                select:{
                    id:true,
                    roleId:true,
                    name:true,
                    email:true,
                    password:true,
                    isDeleted:true,
                    createdAt:true,
                    updatedAt:true
                }
            })
            return {
                id:newUser.id,
                roleid:newUser.roleId,
                name:newUser.name,
                
                email:newUser.email,
                password:newUser.password,
                isDeleted:newUser.isDeleted,
                createdAt:newUser.createdAt,
                updatedAt:newUser.updatedAt

            }


        }catch(error){
            throw new Error("Error saving user");
        }
        
    }
    public async update(user: User,data:any): Promise<void> {
        try{
            await db.user.update({
                where:{
                    id:user.id,
                    isDeleted:false
                },
                data:data
            })

        }catch(error){
            throw new Error("Error updating user");
        }
    }

    public async updatePassword(user: User, password: string): Promise<void> {
        try{
            await db.user.update({
                where:{
                    id:user.id,
                    isDeleted:false
                },
                data:{
                    password:password
                }
            })

        }catch(error){
            throw new Error("Error updating user");
        }
    }
    public async delete(user: User): Promise<void> {
        try{
            await db.user.update({
                where:{
                    id:user.id,
                    isDeleted:false
                },
                data:{
                    isDeleted:true
                }
            })

        }catch(error){
            throw new Error("Error deleting user");
        }
    }
    public async fisicalDelete(user: User): Promise<void> {
        try{
            await db.user.delete({
                where:{
                    id:user.id
                }
            })

        }catch(error){
            throw new Error("Error deleting user");
        }
    }
    public async find(page?: number | undefined, limit?: number | undefined): Promise<User[] |Pagination> {
        try{
            if(page && limit){
                const alregistro=await db.user.count({
                    where:{
                        isDeleted:false,
                        
                    }
                }

                );
                const result=await db.user.findMany({
                    where:{
                        isDeleted:false,
                        
                    },
                    skip:(page-1)*limit,
                    take:limit,
                    select:{
                        id:true,
                        roleId:true,
                        name:true,
                        
                       
                        email:true,
                        password:true,
                        isDeleted:true,
                        createdAt:true,
                        updatedAt:true
                    }
                })
                const users:User[]=[];
                result.forEach((user)=>{
                    users.push({
                        id:user.id,
                        roleid:user.roleId,
                        name:user.name,
                    
                        email:user.email,
                        password:user.password,
                        isDeleted:user.isDeleted,
                        createdAt:user.createdAt,
                        updatedAt:user.updatedAt
                    })
                })
                return {
                    data:users,
                    currentPage:page,
                    limit:limit,
                    totalItems:alregistro,
                    totalPages:Math.ceil(alregistro/limit)
                    
                
                }
            }
            const result=await db.user.findMany({
                where:{
                    isDeleted:false,
                    
                },select:{
                    id:true,
                    name:true,
                    roleId:true,
                   
                    email:true,
                    password:true,
                    isDeleted:true,
                    createdAt:true,
                    updatedAt:true
                }
            })
            const users:User[]=[];
            result.forEach((user)=>{
                users.push({
                    id:user.id,
                    roleid:user.roleId,
                    name:user.name,
                  
                    email:user.email,
                    password:user.password,
                    isDeleted:user.isDeleted,
                    createdAt:user.createdAt,
                    updatedAt:user.updatedAt
                })
            })
            return users;
        }catch(e:any){
            throw new Error("Error getting users")
        }
       
    }
    public async findById(id: number): Promise<User | null> {
        const result=await db.user.findFirst({
            where:{
                id:id,
                isDeleted:false
            }
            ,
            select:{
                id:true,
                roleId:true,
                name:true,
                email:true,
                password:true,
                isDeleted:true,
                createdAt:true,
                updatedAt:true
            }
        })
        if(result){
            const user:User={
                id:result.id,
                roleid:result.roleId,
                name:result.name,
                email:result.email,
                password:result.password,
                isDeleted:result.isDeleted,
                createdAt:result.createdAt,
                updatedAt:result.updatedAt
            }
            return user;
        }
        return null;
    }

}