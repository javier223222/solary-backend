import User from "../../domain/entities/user.entity";
import UserRepository from "../../domain/ports/user-repository.port";
import { db } from "../../infrastructure/database/data-source";

export default class UserRepositoryAdapter implements UserRepository {
   user: User;
    constructor(user: User) {
         this.user = user;
    }
    public async findBYEmail(email: string): Promise<User | null> {
        const result=await db.user.findFirst({
            where:{
                email:email
            }
        })
        if(result){
            const user:User={
                id:result.id,
                name:result.name,
                lastname:result.lastname,
                username:result.username,
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