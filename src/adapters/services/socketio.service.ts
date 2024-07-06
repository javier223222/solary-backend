import { Server, Socket } from "socket.io";
import JwtService from "../services/jwt.service";
import amqp from 'amqplib/callback_api';
import "dotenv/config";
import SensorDataUseCase from "../../application/usecases/sensordata.usecase";
import { StatsClient } from "../../infrastructure/stadicts/stadicts";
import { SensorData } from "../../domain/entities/sensordara.entity";
import ProbabilityClient from "../../infrastructure/probability/probability";

const jwtserivce=new JwtService()
export class SocketIOService {
    private io: Server;

    constructor(io: Server,private sensorDataUseCase:SensorDataUseCase,private staclient:StatsClient,private probability:ProbabilityClient) {
        this.io = io;
    }

    public initSocketIO(): void {
        console.log("Initializing Socket.IO");
        this.io.use((socket: any, next) => {
            
            // Middleware para verificar el token JWT
            const token = socket.handshake.auth?.token || socket.handshake.headers?.token
            socket.token=token
            console.log(token)
            if (!token) {
                return next(new Error("Authentication error"));
            }
            try {
                const decoded = jwtserivce.verifyToken(token);
                socket.idSpeceficProduct = decoded.idSpeceficProduct;
                next();
            } catch (err) {
                
                next(new Error("Authentication error"));
            }
        });

        this.io.on("connection", (socket: any) => {
            console.log(socket.idSpeceficProduct)
            

            // Unirse a una sala específica con el ID de usuario
            socket.join(`${socket.idSpeceficProduct}`);
            // Replace the $SELECTION_PLACEHOLDER$ code with the following code
            amqp.connect(process.env.RABBITMQ_URL as string, {
                username: process.env.RABBITMQ_USERNAME as string,
                password: process.env.RABBITMQ_PASSWORD as string
            }, (err, connection) => {
                if (err) throw err;
                connection.createChannel((err1, channel) => {
                    if (err1) throw err1;
                    const queue = process.env.RABBITMQ_QUEUE as string;
                    channel.assertQueue(queue, { durable: true });
                    channel.consume(queue,async (msg) => {
                        if (msg !== null) {

                           const mesaggeget = JSON.parse(msg.content.toString());
                           if(mesaggeget.codeOfProduct==socket.idSpeceficProduct){
                            let result:SensorData[]
                            let result2:SensorData[]
                            const resultone=await this.sensorDataUseCase.getByYear(mesaggeget.codeOfProduct,undefined,2)
                            const {label,data}=await this.staclient.calculateHistogram(resultone,socket.token)
                            let jsonresult:any={
                             success:true,
                             message:"Data found",
                             label,
                             data,
                             nameSensor:"modulo de sensor de luz fotoresistencia ldr",
                             }
                             this.io.to(`${socket.idSpeceficProduct}`).emit("histogram", jsonresult);
                             result=await this.sensorDataUseCase.getByYear(mesaggeget.codeOfProduct,undefined,4)
                             result2=await this.sensorDataUseCase.getByYear(mesaggeget.codeOfProduct,undefined,2)
                             const mathSplot=await this.staclient.scatterPlot(result,result2,socket.token)
                             const datamathsplo=mathSplot.data
                             const x=mathSplot.x
                             const y=mathSplot.y
                             jsonresult={
                                success:true,
                                message:"Data found",
                                data:datamathsplo,
                                x,
                                y,
                            }
                            this.io.to(`${socket.idSpeceficProduct}`).emit("scatterplot", jsonresult);
                            result=await this.sensorDataUseCase.getByYear(mesaggeget.codeOfProduct)
                            const datavaribles=await this.staclient.linechart(result,socket.token)
                            jsonresult={
                                success:true,
                                message:"Data found",
                                data:datavaribles,
                            }
                            this.io.to(`${socket.idSpeceficProduct}`).emit("linechart", jsonresult);
                            result=await this.sensorDataUseCase.getByYear(mesaggeget.codeOfProduct)
                            const datafre=await this.staclient.frequencytable(result,socket.token)
                            jsonresult={
                                success:true,
                                message:"Data found",
                                data:datafre,
                            }
                            this.io.to(`${socket.idSpeceficProduct}`).emit("frequencytable", jsonresult);
                            const boxplot=await this.staclient.boxplot(result,socket.token)
                            jsonresult={
                                success:true,
                                message:"Data found",
                                data:boxplot,
                            }
                            this.io.to(`${socket.idSpeceficProduct}`).emit("boxplot", jsonresult);
                            result=await this.sensorDataUseCase.getByYear(mesaggeget.codeOfProduct)
                            const metricts=await this.staclient.getStatistics(result,socket.token)
                            jsonresult={
                                success:true,
                                message:"Data found",
                                data:metricts,
                            }
                            this.io.to(`${socket.idSpeceficProduct}`).emit("metricts", jsonresult);
                            result=await this.sensorDataUseCase.getByYear(mesaggeget.codeOfProduct,undefined,2)
                            const temporalSeries=await this.probability.temporalSeries(result,socket.token)
                            jsonresult={
                                success:true,
                                message:"Data found",
                                data:temporalSeries,
                            }
                            this.io.to(`${socket.idSpeceficProduct}`).emit("probability-temporalSeries", jsonresult);
                            result=await this.sensorDataUseCase.getByYear(mesaggeget.codeOfProduct,undefined,1)
                            const probabilitySensor=await this.probability.probabilitySensor(result,23,socket.token)
                            jsonresult={
                                success:true,
                                message:"Data found",
                                data:probabilitySensor,
                            }
                            this.io.to(`${socket.idSpeceficProduct}`).emit("probability-sensor", jsonresult);
                            result=await this.sensorDataUseCase.getByYear(mesaggeget.codeOfProduct,undefined,3)
                            const predict_detection=await this.probability.predictDetection(result,socket.token)
                            jsonresult={
                                success:true,
                                message:"Data found",
                                data:predict_detection,
                            }
                            this.io.to(`${socket.idSpeceficProduct}`).emit("predict-detection", jsonresult);
                            result=await this.sensorDataUseCase.getByYear(mesaggeget.codeOfProduct,undefined,4)
                            const detectanomaly=await this.probability.detectanomaly(result,socket.token)
                            if(detectanomaly.anomalies.length>0){
                                jsonresult={
                                    success:true,
                                    message:"Deteccion de falla en el sensor de luz fotoresistencia ldr",
                                    data:detectanomaly,
                                    anomalia:datafre[0].anomalia,
                                    
                                }
                                this.io.to(`${socket.idSpeceficProduct}`).emit("detect-anomaly", jsonresult);
                            
                            }

                            



                        




                           }


                         channel.ack(msg);
                            
                        }
                        
                    });
                });
            });

            // Manejar el evento 'sensorData' recibido desde el cliente
            socket.on("sensorData", (data: any) => {
                // Procesar los datos recibidos desde el cliente
                // axios.post("http://localhost:8000/process-data", data)
                //     .then(response => {
                //         console.log(response.data);
                //         // Emitir eventos de Socket.IO con los datos procesados
                //         this.io.to("roomName").emit("processedData", response.data); // Emitir a una sala específica
                //         socket.emit("processedData", response.data); // Emitir solo al cliente que envió el evento
                //     })
                //     .catch(error => {
                //         console.error("Error processing data:", error);
                //     });
            });
        });
    }
}
