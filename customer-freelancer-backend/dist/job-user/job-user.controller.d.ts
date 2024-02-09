import { JobUserService } from './job-user.service';
import { CreateJobUserDto } from './dto/create-job-user.dto';
import { Response } from 'express';
export declare class JobUserController {
    private readonly jobUserService;
    constructor(jobUserService: JobUserService);
    create(createJobUserDto: CreateJobUserDto, res: Response, req: any): Promise<Response<any, Record<string, any>>>;
    findByJobId(id: string, res: Response): Promise<Response<any, Record<string, any>>>;
    findByUserId(id: string, res: Response): Promise<Response<any, Record<string, any>>>;
    remove(id: string, res: Response, req: any): Promise<Response<any, Record<string, any>>>;
}
