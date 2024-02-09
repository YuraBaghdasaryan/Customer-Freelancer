import { Repository } from 'typeorm';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './entities/customer.entity';
import { User } from 'src/user/entities/user.entity';
export declare class CustomerService {
    private customerRepository;
    private userRepository;
    constructor(customerRepository: Repository<Customer>, userRepository: Repository<User>);
    create(createCustomerDto: CreateCustomerDto): Promise<string>;
    findAll(): Promise<Customer[]>;
    findOne(id: number): Promise<Customer>;
    update(id: number, updateCustomerDto: UpdateCustomerDto): Promise<string>;
}
