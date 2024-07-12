export default class Anomaly {
    id:number
    sensorDataId:number
    isDeleted:boolean
    createdAt:Date
    updatedAt:Date
    createdBy:number
    updatedBy:number
    constructor(){
        this.id=0
        this.sensorDataId=0
        this.isDeleted=false
        this.createdAt=new Date()
        this.updatedAt=new Date()
        this.createdBy=0
        this.updatedBy=0
    }
    
}