import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { Role } from './user/role/role.enum';
import { UserService } from './user/user.service';
import { Response } from 'express';
import { CreateUserDto } from './user/dto/create-user.dto';
import { Login } from './user/dto/login-user.dto';
export declare class AppController {
    private readonly appService;
    private readonly userSerevice;
    private authService;
    constructor(appService: AppService, userSerevice: UserService, authService: AuthService);
    login(us: Login, req: any): Promise<{
        access_token: string;
        role: Role;
    }>;
    create(createUserDto: CreateUserDto, res: Response): Promise<Response<any, Record<string, any>>>;
    getProfile(req: any, res: Response): Promise<Response<any, Record<string, any>>>;
}
