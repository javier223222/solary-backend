import User from "../entities/user.entity";

export default interface UserRepository {
    findBYEmail(email: string): Promise<User | null>;
    
}