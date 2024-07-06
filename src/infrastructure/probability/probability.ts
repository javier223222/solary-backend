import axios from "axios";
import "dotenv/config";
import { SensorData } from "../../domain/entities/sensordara.entity";

export default class ProbabilityClient {
    async temporalSeries(sensor_data:SensorData[],token:string):Promise<any>{
        try{
            const response=await axios.post(`${process.env.STATS_URL}/api/v1/probability/temporalSeries`,{
                sensor_data
            },{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return JSON.parse(response.data)

        }catch(err:any){
            console.log(err)
            throw new Error(err)
        }
    }
    async probabilitySensor(sensor_data:SensorData[],threshold:number,token:string):Promise<any>{
        try{
            const response=await axios.post(`${process.env.STATS_URL}/api/v1/probability/probabilitysensor`,{
                sensor_data,
                threshold
            },{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return JSON.parse(response.data)

        }catch(err:any){
            console.log(err)
            throw new Error(err)
    }
    
    }
    async predictDetection(sensor_data:SensorData[],token:string):Promise<any>{
        try{
            const response=await axios.post(`${process.env.STATS_URL}/api/v1/probability/predictfault`,{
                sensor_data
            },{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return JSON.parse(response.data)

        }catch(err:any){
            console.log(err)
            throw new Error(err)
        }
    }
    
    async detectanomaly(sensor_data:SensorData[],token:string):Promise<any>{
        try{
            const response=await axios.post(`${process.env.STATS_URL}/api/v1/probability/detectanomalies`,{
                sensor_data
            },{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return JSON.parse(response.data)

        }catch(err:any){
            console.log(err)
            throw new Error(err)
        }   
    }
}