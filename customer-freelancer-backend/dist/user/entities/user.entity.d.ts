import { Role } from 'src/user/role/role.enum';
import { Customer } from 'src/customer/entities/customer.entity';
import { Freelancer } from 'src/freelancer/entities/freelancer.entity';
export declare class User {
    id: number;
    name: string;
    surname: string;
    email: string;
    password: string;
    emailToken: string;
    isVerified: number;
    code: number;
    role: Role;
    customer: Customer;
    freelancer: Freelancer;
}
