import { SensorData } from "../entities/sensordara.entity";

export default interface SensorDataRepository {
    save(data:SensorData):Promise<SensorData>
    
    
}