import { Router,Request,Response } from 'express';
import UserLoginUseCase from '../../application/usecases/user-login.usecase';

export default class UserController{
   public router: Router;
   private userLoginUseCase: UserLoginUseCase;
    constructor(userLoginUseCase: UserLoginUseCase){
         this.router=Router();
         this.userLoginUseCase=userLoginUseCase;
         this.routes();
    }
    private routes(){
        this.router.post("/",this.login.bind(this));
    }
    private async login(req: Request, res: Response):Promise<Response>{
        const {email,password}=req.body;
        try {
            const token=await this.userLoginUseCase.login(email,password);
            return res.status(200).json({success:true,token});
        } catch (error) {
            return res.status(400).json({success:false,error:"Invalid credentials"});
        }
    }



}