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
    async detectanmoliByK(sensor_data:SensorData[],k:number,token:string):Promise<any>{
        try{
            const response=await axios.post(`${process.env.STATS_URL}/api/v1/probability/prrobabilityknearest`,{
                sensor_data,
                k
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
    async detectanmoliByPca(sensor_data:SensorData[],token:string):Promise<any>{
        try{
            const response=await axios.post(`${process.env.STATS_URL}/api/v1/probability/probabilitypca`,{
                sensor_data,
                
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
    async detectanomalyByMonteCarlo(sensor_data:SensorData[],token:string):Promise<any>{
        try{
            const response=await axios.post(`${process.env.STATS_URL}/api/v1/probability/probabilitybymontecarlo`,{
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
    async detectanomalyByMethodPoint(sensor_data:SensorData[],token:string):Promise<any>{
        try{
            const response=await axios.post(`${process.env.STATS_URL}/api/v1/probability/probabilitybypoisson`,{
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