export default interface JwtServicePort {
    generateToken(payload: any): string;
    verifyToken(token: string): any;
}