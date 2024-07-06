import { SensorData } from "../entities/sensordara.entity";

export default interface SensorDataRepository {
    save(data:SensorData):Promise<SensorData>
    get(codeOfProduct:string,typeSensorId?:number):Promise<Array<SensorData>>
    getByDate(codeOfProduct:string,year:number, month:number,typeSensorId?:number):Promise<Array<SensorData>>
    getByYear(codeOfProduct:string,year?:number,typeSensorId?:number):Promise<Array<SensorData>>

    
    
}