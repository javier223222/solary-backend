import { Router,Request,Response } from 'express';
import UserLoginUseCase from '../../application/usecases/user-login.usecase';
import UserRegisterUseCase from '../../application/usecases/user.register.usercase';
import "dotenv/config";
export default class UserController{
   public router: Router;
   private userLoginUseCase: UserLoginUseCase;
   private registerUserCase:UserRegisterUseCase;
    constructor(userLoginUseCase: UserLoginUseCase,registerUserCase:UserRegisterUseCase){
         this.router=Router();
         this.userLoginUseCase=userLoginUseCase;
        this.registerUserCase=registerUserCase;
         this.routes();
    }
    private routes(){
        this.router.post("/login",this.login.bind(this));
        this.router.post("/signup",this.register.bind(this));
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
    public async register(req: Request, res: Response):Promise<Response>{

        const {username,name,lastname,email,password,codigoproducto}=req.body;
        try {
            await this.registerUserCase.register({
                name:name,
                lastname:lastname,
                email:email,
                password:password,
                id:0,
                createdAt:new Date(),
                updatedAt:new Date(),
                isDeleted:false,
                roleid:Number(process.env.ROLEID as string),
                username:username



            },codigoproducto);
            return res.status(201).json({success:true,message:"User registered successfully"});
        } catch (error:any) {
            console.log(error.message)
            return res.status(400).json({success:false,message:"Error registering user"});
        }
    }



}