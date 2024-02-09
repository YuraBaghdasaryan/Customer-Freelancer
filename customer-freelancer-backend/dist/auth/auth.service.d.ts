import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
export declare class AuthService {
    private jwtService;
    private userServ;
    constructor(jwtService: JwtService, userServ: UserService);
    validateUser(username: string, password: string): Promise<any>;
    login(user: User): Promise<{
        access_token: string;
        role: import("../user/role/role.enum").Role;
    }>;
}
