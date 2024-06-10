import UserRepository from "../../domain/ports/user-repository.port";
import JwtServicePort from "../../domain/ports/jwt-service.port";
import bcrypt from 'bcrypt';
export default class UserLoginUseCase {
    private userRepository: UserRepository;
    private jwtService: JwtServicePort;
    constructor(userRepository: UserRepository, jwtService: JwtServicePort) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }
    public async login(email: string, password: string): Promise<string> {
        const user = await this.userRepository.findBYEmail(email);
    
        if (!bcrypt.compareSync(password,user!.password)||!user) {
            throw new Error("Invalid credentials");
        }
        return this.jwtService.generateToken({ id: user.id });
    }
}