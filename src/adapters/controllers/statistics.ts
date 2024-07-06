import  {Request,Response }  from "express";
import express from "express";
import SensorDataUseCase from "../../application/usecases/sensordata.usecase";
import { SensorData } from "../../domain/entities/sensordara.entity";
import { StatsClient } from "../../infrastructure/stadicts/stadicts";
import JwtService from "../services/jwt.service";
const router=express.Router();
const jwtserivce=new JwtService()
export default class Statics{
    constructor(private sensorDataUseCase:SensorDataUseCase,private staclient:StatsClient){
        router.get("/metricts",async(req:Request,res:Response):Promise<Response>=>{
            try{
                const {idSpeceficProduct}= jwtserivce.verifyToken(req.headers.authorization as string)
                const {year,month}=req.query
                let result:SensorData[]
                if(month && year){
                    result=await this.sensorDataUseCase.getByDate(idSpeceficProduct,Number(year),Number(month))
                }else if(year){
                    result=await this.sensorDataUseCase.getByYear(idSpeceficProduct,Number(year))
                }else{
                    result=await this.sensorDataUseCase.getByYear(idSpeceficProduct)
                }            
                if(result.length===0){
                    return res.status(200).json({
                        success:true,
                        message:"Data found ",
                        histogram:[],    
                    })
                }
                const data=await this.staclient.getStatistics(result,req.headers.authorization as string)
                return res.status(200).json({
                    success:true,
                    message:"Data found",
                    data
                })


            }catch(e:any){
                console.log(e)
                return res.status(500).json({
                    success:false,
                    message:"Internal Server Error"
                })
            }
        })
    }
    public getRouter(){
        return router;
    }

}