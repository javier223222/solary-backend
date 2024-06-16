import Pagination from "../../types/paginate.type";
import User from "../entities/user.entity";

export default interface UserRepository {
    findBYEmail(email: string): Promise<User | null>;
    save(user: User): Promise<User>
    update(user: User,data:any): Promise<void>
    update(user: User,data:any): Promise<void>
    updatePassword(user: User, password: string): Promise<void>
    delete(user: User): Promise<void>
    fisicalDelete(user: User): Promise<void>
    find(page?:number,limit?:number): Promise<User[]|Pagination>
    findById(id: number): Promise<User | null>
   
}