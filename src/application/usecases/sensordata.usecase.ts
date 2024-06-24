
import { SensorData } from "../../domain/entities/sensordara.entity";
import SensorDataRepository from "../../domain/ports/sensordata.repository.port";
import { RabbitMqClient } from "../../infrastructure/rabbitmq/RabbitMqClient";
export default class SensorDataUseCase {
    
    constructor(private sensorDataRepository: SensorDataRepository,
        private rabbitMqClient: RabbitMqClient
        
    ) {
      
    }
   public  async save(data: SensorData): Promise<SensorData> {
        await this.rabbitMqClient.sendMessagge(data);
        return await this.sensorDataRepository.save(data);

    }
    
}