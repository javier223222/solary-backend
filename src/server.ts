import http from 'http';
import app from './app';

import SensorDataUseCase from './application/usecases/sensordata.usecase';
import { MqttClientClass} from './infrastructure/mqtt/MqttClient';
import SensorDataRepository from './domain/ports/sensordata.repository.port';
import SensorDataRepositoryAdapter from './adapters/repositories/sensordata.repository';
import { RabbitMqClient } from './infrastructure/rabbitmq/RabbitMqClient';
import { SensorData } from './domain/entities/sensordara.entity';

const sensorDataRepository:SensorDataRepository=new SensorDataRepositoryAdapter();
const rabbitmqClient=new RabbitMqClient();
const sensorDataUseCase:SensorDataUseCase=new SensorDataUseCase(sensorDataRepository,rabbitmqClient);
// const mqttClient=new MqttClientClass(sensorDataUseCase);


import { Server } from 'socket.io';
import { SocketIOService } from './adapters/services/socketio.service';
import { StatsClient } from './infrastructure/stadicts/stadicts';
import ProbabilityClient from './infrastructure/probability/probability';
const probabilityClient=new ProbabilityClient();
const server=http.createServer(app);
// const io=new Server(server,{
//     cors:{
//         origin:"*",
//         methods:["GET","POST"]
//     }
// });
const PORT=process.env.PORT||3000;
// const socketIOService=new SocketIOService(io,sensorDataUseCase,new StatsClient(),probabilityClient);
// socketIOService.initSocketIO();

server.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})


// rabbitmqClient.connect().then(() => {
    
//     console.log('Connected to RabbitMQ');
// }).catch(err => {
//     console.error('Failed to connect to RabbitMQ



