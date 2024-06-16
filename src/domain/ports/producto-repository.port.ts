import Product from "../entities/product.entity";

import Pagination from "../../types/paginate.type";

export default interface ProductoRepository {
    findByName(name: string): Promise<Product | null>;
    save(product: Product): Promise<void>
    updateName(product: Product, name: string): Promise<void>
    updateDescription(product: Product, description: string): Promise<void>
    updateStock(product: Product): Promise<void>

    delete(product: Product): Promise<void>
    fisicalDelete(product: Product): Promise<void>
    find(page?:number,limit?:number): Promise<Product[]|Pagination>
    findById(id: number): Promise<Product | null>
}