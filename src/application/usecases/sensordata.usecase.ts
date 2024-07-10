
import { SensorData } from "../../domain/entities/sensordara.entity";
import SensorDataRepository from "../../domain/ports/sensordata.repository.port";
import { RabbitMqClient } from "../../infrastructure/rabbitmq/RabbitMqClient";
export default class SensorDataUseCase {
    
    constructor(private sensorDataRepository: SensorDataRepository,
        private rabbitMqClient: RabbitMqClient

        
    ) {
      
    }
   public  async save(data: SensorData): Promise<SensorData> {
        let  result=await this.sensorDataRepository.save(data);
        await this.rabbitMqClient.sendMessagge(data);
        console.log("Datos guardado correctamente",(result))
        
        return data

    }
    public async get(codeOfProduct:string,typeSensorId?: number | undefined): Promise<SensorData[]> {
       const result= await this.sensorDataRepository.get(codeOfProduct,typeSensorId);
       console.log(result)
       return result;
    }
    public async getByDate(codeOfProduct:string,year: number, month: number, typeSensorId?: number | undefined): Promise<SensorData[]> {
        const result= await this.sensorDataRepository.getByDate(codeOfProduct,year,month,typeSensorId);
        console.log(result)
        return result;
    }
    public async getByYear(codeOfProduct:string,year?: number | undefined, typeSensorId?: number | undefined): Promise<SensorData[]> {
        const result= await this.sensorDataRepository.getByYear(codeOfProduct,year,typeSensorId);
        console.log(result)
        return result;
    }
    

    
}