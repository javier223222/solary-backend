import { SensorData } from "../../domain/entities/sensordara.entity";
import SensorDataRepository from "../../domain/ports/sensordata.repository.port";
import { db } from "../../infrastructure/database/data-source";

export default class SensorDataRepositoryAdapter implements SensorDataRepository{
    public async save(data: SensorData): Promise<SensorData> {
        try{
            const dataSaved=await db.sensorData.create({
                data:{
                    valor:data.valor,
                    sensorId:Number(data.sensorId),
                    createdBy:1,
                    updatedBy:1,
                    createdAt:new Date(),
                    codeOfProduct:data.codeOfProduct,
                    isDeleted:false
                }
            })
            return {
                ...data,
                id:dataSaved.id,
                createdAt:dataSaved.createdAt,
                updatedAt:dataSaved.updatedAt
            }

        }catch(error){
            console.log(error)
            throw new Error("Method not implemented.");
        }
        
    }

}