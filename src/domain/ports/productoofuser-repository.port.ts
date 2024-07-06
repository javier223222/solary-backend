import Pagination from "../../types/paginate.type";
import { ProductOfUser } from "../entities/productofuser.entity";



export default interface ProductOfUserRepository {
   
    save(productoOfUser: ProductOfUser): Promise<ProductOfUser>
    delete(id:number): Promise<ProductOfUser>
    fisicalDelete(id:number): Promise<ProductOfUser>
    find(page?:number,limit?:number): Promise<Pagination|any[]>
    findById(id: number): Promise<ProductOfUser | null>
    findByUserId(id: number,page?: number , limit?: number): Promise<Pagination|any[]>
    findBySpecificProduct(codigo:string,page?: number , limit?: number):Promise<Pagination|any[]>

}