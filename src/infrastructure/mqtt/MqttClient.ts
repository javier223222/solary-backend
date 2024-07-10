// src/infrastructure/mqtt/MqttClient.ts
import mqtt,{ MqttClient,ErrorWithReasonCode } from 'mqtt';


import { SensorData } from '../../domain/entities/sensordara.entity';
import SensorDataUseCase from '../../application/usecases/sensordata.usecase';
import "dotenv/config";

export class MqttClientClass {
    private client: MqttClient;

    constructor(private sensorService: SensorDataUseCase) {
        this.client = mqtt.connect(process.env.MQTT_URL as string, {
            username: process.env.MQTT_USERNAME as string,
            password:process.env.MQTT_PASSWORD as string
        });

       
         
    
            this.client.on('connect', () => {
                console.log('Connected to MQTT broker');
                this.client.subscribe(process.env.MQTT_Topic as string, (err) => {
                    if (err) {
                        console.error('Failed to subscribe to topic');
                    }
    
                });
            });
    
            this.client.on('message', async (topic:string, message:any) => {
                if (topic ===process.env.MQTT_TOPIC ) {
                    console.log('Received message from MQTT broker');
                    const data = JSON.parse(message.toString());
                   
                    const {sensorId,valor,nameSensor,codeOfProduct}=data
                    const sensorDats:SensorData={
                        id:0,
                        isDeleted:false,
                        valor:Number(valor),
                        sensorId:sensorId,
                        codeOfProduct:codeOfProduct,
                        createdAt:new Date(),
                        createdBy:1,
                        updatedAt:new Date(),
                        updatedBy:0,
                        nameSensor:nameSensor
                        


                    }
                    
                   
                    await this.sensorService.save(data);
                }
            });

            this.client.on('error', (error) => {
                console.error('Error connecting to MQTT broker', error);
            });
      
    }
}
