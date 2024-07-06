import axios from "axios";
import "dotenv/config";
import { SensorData } from "../../domain/entities/sensordara.entity";
export class StatsClient {
    async calculateHistogram(sensor_values:SensorData[],token:string):Promise<any>{ 
        const response = await axios.post(`${process.env.STATS_URL}/api/v1/stats/histogram`,{
            sensor_values: sensor_values


        },
        
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return JSON.parse(response.data);

  
        }
    
    
    async scatterPlot(sensor_data1:SensorData[],sensor_data2:SensorData[],token:string):Promise<any>{
        try{
            const response=await axios.post(`${process.env.STATS_URL}/api/v1/stats/scatter-plot`,{
                sensor_data1,
                sensor_data2

            },{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            return JSON.parse(response.data)

        }catch(err:any){
            throw new Error(err)
        }

    }
    async linechart(sensor_data:SensorData[],token:string):Promise<any>{
        try{
            const response=await axios.post(`${process.env.STATS_URL}/api/v1/stats/line-chart`,{
                sensor_data

            },{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            return JSON.parse(response.data)

        }catch(err:any){
            throw new Error(err)
        }

    }
    async frequencytable(sensor_data:SensorData[],token:string):Promise<any>{
        try{
            const response=await axios.post(`${process.env.STATS_URL}/api/v1/stats/frecuencytable`,{
                sensor_data

            },{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            return JSON.parse(response.data)

        }catch(err:any){
            
            throw new Error(err)
        }

    }
    async boxplot(sensor_data:SensorData[],token:string):Promise<any>{
        try{
            const response=await axios.post(`${process.env.STATS_URL}/api/v1/stats/boxplot`,{
                sensor_data

            },{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            return JSON.parse(response.data)

        }catch(err:any){
            throw new Error(err)
        }
    }
    async getStatistics(sensor_data:SensorData[],token:string):Promise<any>{
        try{
            const response=await axios.post(`${process.env.STATS_URL}/api/v1/statics/meditions`,{
                sensor_data

            },{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            return JSON.parse(response.data)


        }catch(err:any){
            throw new Error(err)
        }
    }

    
        
    }