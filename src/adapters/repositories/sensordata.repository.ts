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
                    isDeleted:false,
                    nameSensor:data.nameSensor
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
            throw new Error("Error saving data of sensor ");
        }
        
    }
    
        
    public async get(codeOfProduct:string,typeSensorId?: number | undefined): Promise<SensorData[]> {
        try{
            let result:SensorData[]=[];
            let data:any[]=[]
            if(typeSensorId){
                 data=await db.sensorData.findMany({
                    where:{
                        sensorId:typeSensorId,
                        isDeleted:false,
                        codeOfProduct:codeOfProduct
                    },
                    select:{
                        id:true,
                        sensorId:true,
                        valor:true,
                        isDeleted:true,
                        createdAt:true,
                        updatedAt:true,
                        createdBy:true,
                        updatedBy:true,
                        nameSensor:true,
                        codeOfProduct:true
                    },
                    orderBy:{
                        createdAt:"asc"
                    }

                })
                result=data.map((item)=>{
                    return {
                        id:item.id,
                        sensorId:item.sensorId,
                        valor:item.valor,
                        isDeleted:item.isDeleted,
                        createdAt:item.createdAt,
                        updatedAt:item.updatedAt,
                        createdBy:item.createdBy,
                        updatedBy:item.updatedBy,
                        nameSensor:item.nameSensor,
                        codeOfProduct:item.codeOfProduct
                    }
                })
                return result;

            }
             data=await db.sensorData.findMany({
                where:{
                    isDeleted:false,
                    codeOfProduct:codeOfProduct

                }, select:{
                    id:true,
                    sensorId:true,
                    valor:true,
                    isDeleted:true,
                    createdAt:true,
                    updatedAt:true,
                    createdBy:true,
                    updatedBy:true,
                    nameSensor:true,
                    codeOfProduct:true
                },
                orderBy:{
                    createdAt:"asc"
                }

            })
            result=data.map((item)=>{
                return {
                    id:item.id,
                    sensorId:item.sensorId,
                    valor:item.valor,
                    isDeleted:item.isDeleted,
                    createdAt:item.createdAt,
                    updatedAt:item.updatedAt,
                    createdBy:item.createdBy,
                    updatedBy:item.updatedBy,
                    nameSensor:item.nameSensor,
                    codeOfProduct:item.codeOfProduct
                }
            })
            return result;
            
            

        }catch(error){
            console.log(error)
            throw new Error("Error getting data of sensor ");
        }
    }
   public async getByDate(codeOfProduct:string,year: number, month: number, typeSensorId?: number | undefined): Promise<SensorData[]> {
       try{
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0);

        const data = await db.sensorData.findMany({
            where: {
                createdAt: {
                    gte: startDate,
                    lt: endDate,
                },
                isDeleted: false,
                codeOfProduct: codeOfProduct,
                sensorId: typeSensorId || undefined,
            },
            select: {
                id: true,
                sensorId: true,
                valor: true,
                isDeleted: true,
                createdAt: true,
                updatedAt: true,
                createdBy: true,
                updatedBy: true,
                nameSensor: true,
                codeOfProduct: true,
            },
            orderBy: {
                createdAt: "asc",
            },
        });

        const result = data.map((item) => ({
            id: item.id,
            sensorId: item.sensorId,
            valor: item.valor,
            isDeleted: item.isDeleted,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
            createdBy: item.createdBy,
            updatedBy: item.updatedBy,
            nameSensor: item.nameSensor,
            codeOfProduct: item.codeOfProduct,
        }));

        return result;


       }catch(error){
              console.log(error)
              throw new Error("Error getting data of sensor ");

       }
   }
   public async getByYear(codeOfProduct: string, year?: number | undefined, typeSensorId?: number | undefined): Promise<SensorData[]> {
    try{
        if(year){
            const startDate = new Date(year, 0, 1);
            const endDate = new Date(year, 12, 0);
    
            const data = await db.sensorData.findMany({
                where: {
                    createdAt: {
                        gte: startDate,
                        lt: endDate,
                    },
                    isDeleted: false,
                    codeOfProduct: codeOfProduct,
                    sensorId: typeSensorId || undefined,
                },
                select: {
                    id: true,
                    sensorId: true,
                    valor: true,
                    isDeleted: true,
                    createdAt: true,
                    updatedAt: true,
                    createdBy: true,
                    updatedBy: true,
                    nameSensor: true,
                    codeOfProduct: true,
                },
                orderBy: {
                    createdAt: "asc",
                },
            });
    
           const result = data.map((item) => ({
                id: item.id,
                sensorId: item.sensorId,
                valor: item.valor,
                isDeleted: item.isDeleted,
                createdAt: item.createdAt,
                updatedAt: item.updatedAt,
                createdBy: item.createdBy,
                updatedBy: item.updatedBy,
                nameSensor: item.nameSensor,
                codeOfProduct: item.codeOfProduct,
           }))
    
            return result;

        }
        const currentYear = new Date().getFullYear();

        const data = await db.sensorData.findMany({
            where: {
                createdAt: {
                    gte: new Date(currentYear, 0, 1),
                    lt: new Date(currentYear + 1, 0, 1),
                },
                isDeleted: false,
                codeOfProduct: codeOfProduct,
                sensorId: typeSensorId || undefined,
            },
            select: {
                id: true,
                sensorId: true,
                valor: true,
                isDeleted: true,
                createdAt: true,
                updatedAt: true,
                createdBy: true,
                updatedBy: true,
                nameSensor: true,
                codeOfProduct: true,
            },
            orderBy: {
                createdAt: "asc",
            },
        });

        const result = data.map((item) => ({
            id: item.id,
            sensorId: item.sensorId,
            valor: item.valor,
            isDeleted: item.isDeleted,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
            createdBy: item.createdBy,
            updatedBy: item.updatedBy,
            nameSensor: item.nameSensor,
            codeOfProduct: item.codeOfProduct,
        }));

        return result;


       
    }catch(error){
        console.log(error)
        throw new Error("Error getting data of sensor ");
    }
       
   }
}