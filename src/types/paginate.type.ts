import User from "../domain/entities/user.entity"

type Pagination={
   totalPages:number,
   currentPage:number,
   limit:number,
   totalItems:number,
   data:any[]
}

export default Pagination