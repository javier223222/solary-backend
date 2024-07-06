import  { Express,Request,Response }  from "express";
import express from "express";
import SensorDataUseCase from "../../application/usecases/sensordata.usecase";
import axios from "axios";
const router=express.Router();

export default class SensorController{
    constructor(private sensorDataUseCase:SensorDataUseCase){
        router.post("/sensordata",async(req:Request,res:Response)=>{
            const {sensorId,valor,nameSensor,codeOfProduct}=req.body;

            try {
                await this.sensorDataUseCase.save({
                    id:0,
                    createdAt:new Date(),
                    updatedAt:new Date(),
                    isDeleted:false,
                    valor:valor,
                    sensorId:sensorId,
                    nameSensor:nameSensor,
                    updatedBy:0,
                    createdBy:0,
                    codeOfProduct:codeOfProduct
                    
                
                });
                return res.status(201).json({success:true,message:"Data saved successfully"});
            } catch (error) {
                console.log(error);
                return res.status(400).json({success:false,message:"Error saving data"});
            }
        })
       

    }
    
    getrouter(){
        return router;
    }
}
