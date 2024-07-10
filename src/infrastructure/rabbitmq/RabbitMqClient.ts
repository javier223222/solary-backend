import amqp,{Connection,Channel} from "amqplib"
import { SensorData } from "../../domain/entities/sensordara.entity"

export class RabbitMqClient {
 private connection!:Connection
 private channel!:Channel
 constructor(){
       
 }
 async connect():Promise<void>{
    this.connection=await amqp.connect(process.env.RABBITMQ_URL as string,{
        
        username:process.env.RABBITMQ_USERNAME as string,
        password:process.env.RABBITMQ_PASSWORD as string,
        
    })
    this.channel=await this.connection.createChannel()
    await this.channel.assertQueue(process.env.RABBITMQ_QUEUE as string)

 }

 async sendMessagge(data:SensorData):Promise<void>{
    this.channel.sendToQueue(process.env.RABBITMQ_QUEUE as string,Buffer.from(JSON.stringify(data)))
 }
 async consumeMessages(callback:(msg:SensorData)=>void):Promise<void>{
    this.channel.consume(process.env.RABBITMQ_QUEUE as string,(msg)=>{
        if(msg  !== null){
            const data=JSON.parse(msg.content.toString())
            callback(data)
            this.channel.ack(msg)
        }
    })
 }
}