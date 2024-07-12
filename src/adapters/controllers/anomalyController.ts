import  {Request,Response }  from "express";
import express from "express";

import JwtService from "../services/jwt.service";
const router=express.Router();
const jwtserivce=new JwtService()
import AnomalyServicePort from "../../domain/ports/anomaly.service.port";

export default class AnomalyController{
    constructor(private readonly anomalyService:AnomalyServicePort){
        router.get("/",async(req:Request,res:Response)=>{
            try{
                const {page,limit}=req.query
                const {idSpeceficProduct}= jwtserivce.verifyToken(req.headers.authorization as string)
                const result=await this.anomalyService.get(idSpeceficProduct,Number(page),Number(limit))
                res.status(200).send(result)

            }catch(err:any){
                res.status(500).send({message:err.message})
            }
        })
    }
    getrouter(){
        return router
    }
}