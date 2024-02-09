import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ForgotPassword } from './dto/forgot-password';
import { ResetPassword } from './dto/reset-password';
declare class Verify {
    email: string;
    emailToken: string;
}
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    verify(user: Verify, res: Response): Promise<Response<any, Record<string, any>>>;
    findAll(res: Response): Promise<Response<any, Record<string, any>>>;
    changePassword(changePassword: ChangePasswordDto, res: Response, req: any): Promise<Response<any, Record<string, any>>>;
    update(id: string, updateUserDto: UpdateUserDto, res: Response): Promise<Response<any, Record<string, any>>>;
    forgotPassword(forgotPassword: ForgotPassword, res: Response, req: any): Promise<Response<any, Record<string, any>>>;
    resetPassword(resetPassword: ResetPassword, email: string, res: Response, req: any): Promise<Response<any, Record<string, any>>>;
    remove(id: string, res: Response): Promise<Response<any, Record<string, any>>>;
}
export {};
