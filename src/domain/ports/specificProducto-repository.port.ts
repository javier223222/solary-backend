import Pagination from "../../types/paginate.type"
import SpecificProduct from "../entities/specificproduct.entity"


export default interface SpecificProductoRepository { 
    save(spsceficproducto: SpecificProduct): Promise<void>
    update(codigo:string,newcodigo:string): Promise<void>
    updateidproducto(codigo:string,productoId:number): Promise<void>
    delete(codigo:string): Promise<void>
    fisicalDelete(codgi:string): Promise<void>
    find(page?:number,limit?:number): Promise<any[]|Pagination>
   
    findByProductId(id: number): Promise<any | null>
    findByCodigo(codigo: string): Promise<SpecificProduct>


    
}