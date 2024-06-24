import express,{Express} from 'express';
import cors from 'cors';
import UserRepositoryAdapter from './adapters/repositories/user.repository';
import JwtService from './adapters/services/jwt.service';
import UserLoginUseCase from './application/usecases/user-login.usecase';
import UserController from './adapters/controllers/user.controller';
import User from './domain/entities/user.entity';
import UserRegisterUseCase from './application/usecases/user.register.usercase';
import ProductOfUserRepositoryAdapter from './adapters/repositories/productoofuser.repository';
import ProductoRepositoryAdapter from './adapters/repositories/product.repository';
import SpecificProductoRepositoryAdapter from './adapters/repositories/specificproduct.repository';
import SensorController from './adapters/controllers/sensorController';
import SensorDataUseCase from './application/usecases/sensordata.usecase';

import SensorDataRepository from './domain/ports/sensordata.repository.port';
import SensorDataRepositoryAdapter from './adapters/repositories/sensordata.repository';
import { MqttClientClass} from './infrastructure/mqtt/MqttClient';
import authMiddleware from './infrastructure/middlewares/auth.middleware';
import { RabbitMqClient } from './infrastructure/rabbitmq/RabbitMqClient';

const app:Express=express();
app.use(express.json());


const user:User=new User();
const sensorDataRepository:SensorDataRepository=new SensorDataRepositoryAdapter();
const rabbitmqClient=new RabbitMqClient();

const sensorDataUseCase:SensorDataUseCase=new SensorDataUseCase(sensorDataRepository,rabbitmqClient);
const sensorController=new SensorController(sensorDataUseCase);
app.use("/api/sensor",authMiddleware,sensorController.getrouter());


const userRepositoryAdapter=new UserRepositoryAdapter(user);
const productoofuserrepositoryadapter=new ProductOfUserRepositoryAdapter();
const productrepositoryAdapter=new ProductoRepositoryAdapter()
const spceficcProductRepositoryAdapter=new SpecificProductoRepositoryAdapter()
const jwtService=new JwtService();
const userLoginUseCase=new UserLoginUseCase(userRepositoryAdapter,jwtService);
const userregistercontroller=new UserRegisterUseCase(userRepositoryAdapter,productoofuserrepositoryadapter,productrepositoryAdapter,spceficcProductRepositoryAdapter)
const userController=new UserController(userLoginUseCase,userregistercontroller);
app.use(cors());
app.use("/api/auth",userController.router);
export default app;
