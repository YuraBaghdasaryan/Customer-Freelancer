import { Response } from 'express';
import { CustomerService } from './customer.service';
import { UpdateCustomerDto } from './dto/update-customer.dto';
export declare class CustomerController {
    private readonly customerService;
    constructor(customerService: CustomerService);
    findAll(res: Response): Promise<Response<any, Record<string, any>>>;
    findOne(res: Response, req: any): Promise<Response<any, Record<string, any>>>;
    update(id: string, res: Response, updateCustomerDto: UpdateCustomerDto): Promise<Response<any, Record<string, any>>>;
}
