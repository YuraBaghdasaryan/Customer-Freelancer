import { NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { MailerService } from '@nestjs-modules/mailer/dist';
import { FreelancerService } from 'src/freelancer/freelancer.service';
import { CustomerService } from 'src/customer/customer.service';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ResetPassword } from './dto/reset-password';
import { ForgotPassword } from './dto/forgot-password';
export declare class UserService {
    private userRepository;
    private readonly mailerService;
    private readonly freelancerService;
    private readonly customerService;
    constructor(userRepository: Repository<User>, mailerService: MailerService, freelancerService: FreelancerService, customerService: CustomerService);
    create(createUserDto: CreateUserDto): Promise<string>;
    findAll(): Promise<User[]>;
    verify(user: {
        email: string;
        emailToken: string;
    }): Promise<string>;
    findOne(username: string): Promise<any>;
    changePassword(data: ChangePasswordDto, id: number): Promise<string>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<string>;
    forgotPassword(fPass: ForgotPassword): Promise<string | NotFoundException>;
    resetPassword(rPass: ResetPassword, email: string): Promise<string>;
    remove(id: number): Promise<string>;
}
