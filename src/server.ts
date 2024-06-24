import http from 'http';
import app from './app';
import SensorController from './adapters/controllers/sensorController';
import SensorDataUseCase from './application/usecases/sensordata.usecase';
import { MqttClientClass} from './infrastructure/mqtt/MqttClient';
import SensorDataRepository from './domain/ports/sensordata.repository.port';
import SensorDataRepositoryAdapter from './adapters/repositories/sensordata.repository';
import { RabbitMqClient } from './infrastructure/rabbitmq/RabbitMqClient';
const sensorDataRepository:SensorDataRepository=new SensorDataRepositoryAdapter();
const rabbitmqClient=new RabbitMqClient();
const sensorDataUseCase:SensorDataUseCase=new SensorDataUseCase(sensorDataRepository,rabbitmqClient);
const mqttClient=new MqttClientClass(sensorDataUseCase);

rabbitmqClient.connect().then(() => {
    console.log('Connected to RabbitMQ');
}).catch(err => {
    console.error('Failed to connect to RabbitMQ', err);
});

const server=http.createServer(app);
const PORT=process.env.PORT||3000;
server.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})