import Anomaly from "../entities/anomaly.entity";

export default interface AnomalyServicePort{
   get(codeofproduct:string,page?:number,limit?:number):Promise<any>

}