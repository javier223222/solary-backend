import jwt from 'jsonwebtoken';
import JwtServicePort from '../../domain/ports/jwt-service.port';
import "dotenv/config"
export default class JwtService implements JwtServicePort {
    private readonly secret=process.env.JWT_SECRET as string;
    public generateToken(payload: any): string {
        return jwt.sign(payload,this.secret ,{expiresIn:'1h'});
    }
    public verifyToken(token: string): any {
        return jwt.verify(token,this.secret);
    }
    
}