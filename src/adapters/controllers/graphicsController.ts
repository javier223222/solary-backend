import  {Request,Response }  from "express";
import express from "express";
import SensorDataUseCase from "../../application/usecases/sensordata.usecase";
import { SensorData } from "../../domain/entities/sensordara.entity";
import { StatsClient } from "../../infrastructure/stadicts/stadicts";
import JwtService from "../services/jwt.service";
const router=express.Router();
const jwtserivce=new JwtService()
export default class GraphicsController{
    constructor(private sensorDataUseCase:SensorDataUseCase,private staclient:StatsClient){
     router.get("/histogram",async(req:Request,res:Response):Promise<Response>=>{
        try{
            let result:SensorData[]
            let jsonresult:any={
                success:false,
                message:"",   
            }
            const {idSpeceficProduct}= jwtserivce.verifyToken(req.headers.authorization as string)


            const {year,month,typeSensorId}=req.query
            if(!typeSensorId){
               jsonresult.message="typeSensorId is required"
               
               return res.status(400).json(jsonresult)
            }
            if(month && year){
                result=await this.sensorDataUseCase.getByDate(idSpeceficProduct,Number(year),Number(month),Number(typeSensorId))

            }else if(year){
                result=await this.sensorDataUseCase.getByYear(idSpeceficProduct,Number(year),Number(typeSensorId))
            }else{
                result=await this.sensorDataUseCase.get(idSpeceficProduct,Number(typeSensorId))
            }
            
            
            

            if(result.length===0){
                jsonresult={
                    success:true,
                    message:"Data found ",
                    histogram:[],    
                }
                return res.status(404).json(jsonresult)
            }

            const {label,data}=await this.staclient.calculateHistogram(result,req.headers.authorization as string)
            if(month && year){
                jsonresult={
                    success:true,
                    message:"Data found",
                    label,
                    data,
                    nameSensor:result[0].nameSensor,
                    period:`${year}-0${month}`
                }

            }else{
                jsonresult={
                    success:true,
                    message:"Data found",
                    label,
                    data,
                    nameSensor:result[0].nameSensor,
                    
                }

            }
           
            return res.status(200).json(jsonresult)



            

        }catch(e:any){
            console.log(e)
            return res.status(500).json(
                {
                    success:false,
                    message:"Internal server error"
                }
            )

        }
     })
     router.get("/scatterplot",async(req:Request,res:Response):Promise<Response>=>{
        try{
            const {year,month,typeSensorId,typeSensorIdtwo}=req.query
            let result:SensorData[]
            let result2:SensorData[]
            let jsonresult:any={
                success:false,
                message:"",   
            }
            const {idSpeceficProduct}= jwtserivce.verifyToken(req.headers.authorization as string)

            if(!typeSensorId || !typeSensorIdtwo){
               jsonresult.message="typeSensorId and typeSensorIdtwo is required"
               return res.status(400).json(jsonresult)
            }

            if(month && year){
                
                result=await this.sensorDataUseCase.getByDate(idSpeceficProduct,Number(year),Number(month),Number(typeSensorId))
                result2=await this.sensorDataUseCase.getByDate(idSpeceficProduct,Number(year),Number(month),Number(typeSensorIdtwo))
            }else if(year){
                result=await this.sensorDataUseCase.getByYear(idSpeceficProduct,Number(year),Number(typeSensorId))
                result2=await this.sensorDataUseCase.getByYear(idSpeceficProduct,Number(year),Number(typeSensorIdtwo))
            }else{
                result=await this.sensorDataUseCase.get(idSpeceficProduct,Number(typeSensorId))
                result2=await this.sensorDataUseCase.get(idSpeceficProduct,Number(typeSensorIdtwo))
            }
            if(result.length===0 || result2.length===0){
                jsonresult={
                    success:false,
                    message:"Data found ",
                    data:[],    
                }
                return res.status(200).json(jsonresult)
            }
            const {data,x,y}=await this.staclient.scatterPlot(result,result2,req.headers.authorization as string)
            if(month && year){
                jsonresult={
                    success:true,
                    message:"Data found",
                    data,
                    x,
                    y,
                    period:`${year}-0${month}`
                }
            }
            else{
                jsonresult={
                    success:true,
                    message:"Data found",
                    data,
                    x,
                    y,
                }
            }
            return res.status(200).json(jsonresult)




        }catch(e:any){
            console.log(e)
            return res.status(500).json(
                {
                    success:false,
                    message:"Internal server error"
                }
            )
        }
     })
     router.get("/linachart",async(req:Request,res:Response):Promise<Response>=>{
        try{
         const {year}=req.query
         let result:SensorData[]
         
         const {idSpeceficProduct}= jwtserivce.verifyToken(req.headers.authorization as string)
         if(year){
            result=await this.sensorDataUseCase.getByYear(idSpeceficProduct,Number(year))
         }else{
            result=await this.sensorDataUseCase.getByYear(idSpeceficProduct)
         }
        if(result.length===0){
                return res.status(404).json({
                    success:false,
                    message:"Data not found"
                })
            }
        const data=await this.staclient.linechart(result,req.headers.authorization as string)
        if(year){
            return res.status(200).json({
                success:true,
                message:"Data found",
                data,
                period:year
            })
        }
        return res.status(200).json({
            success:true,
            message:"Data found",
            data,
        })





        }catch(e:any){
            console.log(e)
            return res.status(500).json(
                {
                    success:false,
                    message:"Internal server error"
                }
            )
        }

     })
     router.get("/freqency",async(req:Request,res:Response):Promise<Response>=>{
        try{
            const {year,month}=req.query
            let result:SensorData[]
            let responsejson:any={}
            const {idSpeceficProduct}= jwtserivce.verifyToken(req.headers.authorization as string)

            if(year && month){
                result=await this.sensorDataUseCase.getByDate(idSpeceficProduct,Number(year),Number(month))
                
            }else if(year){
                result=await this.sensorDataUseCase.getByYear(idSpeceficProduct,Number(year))

            }else{
                result=await this.sensorDataUseCase.get(idSpeceficProduct)
            }
            if(result.length===0){
                return res.status(404).json({
                    success:false,
                    message:"Data not found"
                })
            }
            const data=await this.staclient.frequencytable(result,req.headers.authorization as string)
            if(year && month){
                responsejson={
                    success:true,
                    message:"Data found",
                    data,
                    period:`${year}-0${month}`
                }
            }else if(year){
                responsejson={
                    success:true,
                    message:"Data found",
                    data,
                    period:year
                }

            }else{
                responsejson={
                    success:true,
                    message:"Data found",
                    data,
                }
            }
            return res.status(200).json(responsejson)


            

        }catch(e:any){
            console.log(e)
            return res.status(500).json({
                success:false,
                message:"Internal server error"
            })
        }


     })
     router.get("/boxplot",async(req:Request,res:Response):Promise<Response>=>{
        try{
            const {year,month}=req.query
            const {idSpeceficProduct}= jwtserivce.verifyToken(req.headers.authorization as string)
            let result:SensorData[]
            if(year && month){
                result=await this.sensorDataUseCase.getByDate(idSpeceficProduct,Number(year),Number(month))
            }else if(year){
                result=await this.sensorDataUseCase.getByYear(idSpeceficProduct,Number(year))
            }else{
                result=await this.sensorDataUseCase.get(idSpeceficProduct)
            }
            
            const data=await this.staclient.boxplot(result,req.headers.authorization as string)
            return res.status(200).json({
                success:true,
                message:"Data found",
                data
            })
        

            


        }catch(e:any){
            console.log(e)
            return res.status(500).json({
                success:false,
                message:"Internal server error"
            })
        }
     })

    }

    getrouter(){
        return router;
    }
}