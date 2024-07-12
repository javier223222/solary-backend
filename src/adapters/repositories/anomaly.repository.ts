import AnomalyServicePort from "../../domain/ports/anomaly.service.port";
import { db } from "../../infrastructure/database/data-source";

export default class AnomalyRepositoryAdapter implements AnomalyServicePort{
    public async get(codeofproduct: string, page?: number, limit?: number): Promise<any> {
        try{
            if(page && limit){
                const total=await db.anomaly.count({
                    where:{
                        sensorData:{
                            codeOfProduct:codeofproduct
                        },
                        isDeleted:false
                    }
                })
               const totalPages=Math.ceil(total/limit)
               const currentpage=page>totalPages?totalPages:page
                const result=await db.anomaly.findMany({
                     where:{
                          sensorData:{
                            codeOfProduct:codeofproduct
                          },
                          isDeleted:false
                     },
                     select:{
                          sensorData:{
                            select:{
                                 valor:true,
                                 nameSensor:true,
                                 createdAt:true,
                                 codeOfProduct:true,
                                 sensorId:true
                            }
                          }
                     },
                     skip:(currentpage-1)*limit,
                     take:limit
                })
                return {
                    total,
                    totalPages,
                    currentpage,
                    data:result
                }



            
              
            }else{
                const result=await db.anomaly.findMany({

                    where:{
                        sensorData:{
                            codeOfProduct:codeofproduct
                        },
                        isDeleted:false
                    },
                    select:{
                        sensorData:{
                            select:{
                                valor:true,
                                nameSensor:true,
                                createdAt:true,
                                codeOfProduct:true,
                                sensorId:true

                            }
                        }
                    }
                })
                return result
            }

        }catch(err:any){
            console.log(err)
            throw new Error(err)
        }
        
    }
}