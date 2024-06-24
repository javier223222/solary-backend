export class SensorData {
    id:number
    sensorId:number
    valor:number
    isDeleted :boolean
    createdAt:Date
    updatedAt:Date
    createdBy:number
    updatedBy:number
    nameSensor:string
    codeOfProduct:string

    constructor(){
        this.id = 0;
        this.sensorId = 0;
        this.valor = 0;
        this.isDeleted = false;
        this.createdAt = new Date();
        this.updatedAt = new Date();
        this.createdBy = 0;
        this.updatedBy = 0;
        this.nameSensor = '';
        this.codeOfProduct=""
    }
    

  
}