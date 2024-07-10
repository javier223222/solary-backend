import UserRepository from "../../domain/ports/user-repository.port";
import JwtServicePort from "../../domain/ports/jwt-service.port";
import bcrypt from 'bcrypt';
import ProductOfUserRepository from "../../domain/ports/productoofuser-repository.port";
import Pagination from "../../types/paginate.type";
export default class UserLoginUseCase {
    private userRepository: UserRepository;
    private jwtService: JwtServicePort;
    private productOfUserRepository:ProductOfUserRepository
    constructor(userRepository: UserRepository, jwtService: JwtServicePort,productOfUserRepositor:ProductOfUserRepository) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.productOfUserRepository=productOfUserRepositor
    }
    public async login(email: string, password: string): Promise<string> {
        
        const user = await this.userRepository.findBYEmail(email);
        console.log(user)
        let productofuser:any[]|Pagination=await this.productOfUserRepository.findByUserId(user!.id) 
       
        if (!bcrypt.compareSync(password,user!.password)||!user) {
            throw new Error("Invalid credentials");
        }
         productofuser=Array(productofuser)
        

        

        
        return this.jwtService.generateToken({ id: user.id,role:user.roleid,
             idSpeceficProduct:productofuser[0][0].idSpecifProduct
         });
    }
}