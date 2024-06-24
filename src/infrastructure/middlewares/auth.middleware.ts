import express,{ Express,Request,Response,NextFunction } from "express"
import JwtService from "../../adapters/services/jwt.service"

const authMiddleware=async (req:Request,res:Response,next:NextFunction)=>{
    try{

        const jwtser=new JwtService()
        const verifytoken=jwtser.verifyToken(req.headers.authorization as string)
        if(!verifytoken){
            return res.status(401).json({
                success:false,
                message:"unauthorizate"
            })
        }
        next()


        




        

    }catch(err:any){
        console.log(err)
        return res.status(500).json({
            success:false,
            message:"Error en el servidor"
        })
        
    }
    
}

export default authMiddleware