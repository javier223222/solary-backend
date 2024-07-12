import  {Request,Response }  from "express";
import express from "express";
import SensorDataUseCase from "../../application/usecases/sensordata.usecase";
import { SensorData } from "../../domain/entities/sensordara.entity";
import ProbabilityClient from "../../infrastructure/probability/probability";
import JwtService from "../services/jwt.service";

const router=express.Router();
const jwtserivce=new JwtService()
export default class ProbabilityController{
    constructor(private sensorDataUseCase:SensorDataUseCase,private probabilityClient:ProbabilityClient){
        router.get("/temporalseries",async(req:Request,res:Response):Promise<Response>=>{
          try{
           const {sensorId}=req.query
              if(!sensorId){
                return res.status(400).json({
                     success:false,
                     message:"sensorId is required"
                })
              }
                const {idSpeceficProduct}= jwtserivce.verifyToken(req.headers.authorization as string)
                let result:SensorData[]
                result=await this.sensorDataUseCase.get(idSpeceficProduct,Number(sensorId))
                const data=await this.probabilityClient.temporalSeries(result,req.headers.authorization as string)
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
        router.get("/sensor_probability",async(req:Request,res:Response):Promise<Response>=>{
            try{
                const {sensorId,thread}=req.query
                if(!sensorId){
                    return res.status(400).json({
                        success:false,
                        message:"sensorId is required"
                    })
                }
                const {idSpeceficProduct}= jwtserivce.verifyToken(req.headers.authorization as string)
                let result:SensorData[]
                result=await this.sensorDataUseCase.get(idSpeceficProduct,Number(sensorId))
                const data=await this.probabilityClient.probabilitySensor(result,Number(thread),req.headers.authorization as string)
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
        router.get("/predict_detection",async(req:Request,res:Response):Promise<Response>=>{
            try{
                const {sensorId}=req.query
                if(!sensorId){
                    return res.status(400).json({
                        success:false,
                        message:"sensorId is required"
                    })
                }
                const {idSpeceficProduct}= jwtserivce.verifyToken(req.headers.authorization as string)
                let result:SensorData[]
                result=await this.sensorDataUseCase.get(idSpeceficProduct,Number(sensorId))
                const data=await this.probabilityClient.predictDetection(result,req.headers.authorization as string)
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
        router.get("/detect_anomaly",async(req:Request,res:Response):Promise<Response>=>{
           try{
            const {sensorId}=req.query
            if(!sensorId){
                return res.status(400).json({
                    success:false,
                    message:"sensorId is required"
                })
            }
            const {idSpeceficProduct}= jwtserivce.verifyToken(req.headers.authorization as string)
            let result:SensorData[]
            result=await this.sensorDataUseCase.get(idSpeceficProduct,Number(sensorId))
            const data=await this.probabilityClient.detectanomaly(result,req.headers.authorization as string)
            console.log(data)
            return res.status(200).json({
                success:true,
                message:data.anomalies.length!==0?"deteccion de anomalia en el panel con el sensor especificado"+result[0].nameSensor:"No se detecto ninguna anomalia",
                data,
                anomalia:data.anomalies.length===0?false:true
            })
        }catch(e:any){
            console.log(e)
            return res.status(500).json({
                success:false,
                message:"Internal Server Error"
            })
        }

        })
        router.get("/decta_anomaly_knerest",async(req:Request,res:Response):Promise<Response>=>{
            try{
                const {sensorId,k}=req.query
                if(!sensorId){
                    return res.status(400).json({
                        success:false,
                        message:"sensorId is required"
                    })
                }
                const {idSpeceficProduct}= jwtserivce.verifyToken(req.headers.authorization as string)
                let result:SensorData[]
                result=await this.sensorDataUseCase.get(idSpeceficProduct,Number(sensorId))
                const data=await this.probabilityClient.detectanmoliByK(result,Number(k),req.headers.authorization as string)
                return res.status(200).json({
                    success:true,
                    data,
                    message:data.anomalies.length!==0?"deteccion de anomalia en el panel con el sensor especificado"+result[0].nameSensor:"No se detecto ninguna anomalia",
                    anomalia:data.anomalies.length===0?false:true

                })

            }catch(e:any){
                console.log(e)
                return res.status(500).json({
                    success:false,
                    message:"Internal Server Error"
                })
            }

        })
        router.get("/probabilitybypca",async(req:Request,res:Response):Promise<Response>=>{
            try{
                const {sensorId}=req.query
                if(!sensorId){
                    return res.status(400).json({
                        success:false,
                        message:"sensorId is required"
                    })
                }
                const {idSpeceficProduct}= jwtserivce.verifyToken(req.headers.authorization as string)  
                let result:SensorData[]
                result=await this.sensorDataUseCase.get(idSpeceficProduct,Number(sensorId))
                const data=await this.probabilityClient.detectanmoliByPca(result,req.headers.authorization as string)
                return res.status(200).json({
                    success:true,
                    data,
                    message:data.anomalies.length!==0?"deteccion de probabilidad de  anomalia en el panel "+result[0].nameSensor:"No se detecto ninguna anomalia",
                    anomalia:data.anomalies.length===0?false:true
                })

            }catch(e:any){
                console.log(e)
                return res.status(500).json({
                    success:false,
                    message:"Internal Server Error"})
            }
        })
        router.get("/probabilitybymontecarlo",async(req:Request,res:Response):Promise<Response>=>{
            try{
                const {sensorId}=req.query
                if(!sensorId){
                    return res.status(400).json({
                        success:false,
                        message:"sensorId is required"
                    })
                }
                const {idSpeceficProduct}= jwtserivce.verifyToken(req.headers.authorization as string)
                let result:SensorData[]
                result=await this.sensorDataUseCase.get(idSpeceficProduct,Number(sensorId))
                const data=await this.probabilityClient.detectanomalyByMonteCarlo(result,req.headers.authorization as string)
                return res.status(200).json({
                    success:true,
                    data,
                    
                })

            }catch(e:any){
                console.log(e)
                return res.status(500).json({
                    success:false,
                    message:"Internal Server Error"
                })
            }

        })

        router.get("/probabilitybymontecarlo",async(req:Request,res:Response):Promise<Response>=>{
            try{
                const {sensorId}=req.query
                if(!sensorId){
                    return res.status(400).json({
                        success:false,
                        message:"sensorId is required"
                    })
                }
                const {idSpeceficProduct}= jwtserivce.verifyToken(req.headers.authorization as string)
                let result:SensorData[]
                result=await this.sensorDataUseCase.get(idSpeceficProduct,Number(sensorId))
                const data=await this.probabilityClient.detectanomalyByMonteCarlo(result,req.headers.authorization as string)
                return res.status(200).json({
                    success:true,
                    data,
                    
                })
                

            }catch(e:any){
                return res.status(500).json({
                    success:false,
                    message:"Internal Server Error"

                })
            }
        })
        
        router.get("/probabilitybypoisson",async(req:Request,res:Response):Promise<Response>=>{
            try{
                const {sensorId}=req.query
                if(!sensorId){
                    return res.status(400).json({
                        success:false,
                        message:"sensorId is required"
                    })
                }
                const {idSpeceficProduct}= jwtserivce.verifyToken(req.headers.authorization as string)
                let result:SensorData[]
                result=await this.sensorDataUseCase.get(idSpeceficProduct,Number(sensorId))
                const data=await this.probabilityClient.detectanomalyByMethodPoint(result,req.headers.authorization as string)
                return res.status(200).json({
                    success:true,
                    data,
                    
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