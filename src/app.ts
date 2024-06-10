import express,{Express} from 'express';
import cors from 'cors';
import UserRepositoryAdapter from './adapters/repositories/user.repository';
import JwtService from './adapters/services/jwt.service';
import UserLoginUseCase from './application/usecases/user-login.usecase';
import UserController from './adapters/controllers/user.controller';
import User from './domain/entities/user.entity';

const app:Express=express();
app.use(express.json());


const user:User=new User();
const userRepositoryAdapter=new UserRepositoryAdapter(user);
const jwtService=new JwtService();
const userLoginUseCase=new UserLoginUseCase(userRepositoryAdapter,jwtService);
const userController=new UserController(userLoginUseCase);
app.use(cors());
app.use("/login",userController.router);
export default app;
