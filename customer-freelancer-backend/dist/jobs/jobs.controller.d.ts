import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto, UpdateJobStatus } from './dto/update-job.dto';
import { Response } from 'express';
export declare class JobsController {
    private readonly jobsService;
    constructor(jobsService: JobsService);
    create(createJobDto: CreateJobDto, res: Response, req: any): Promise<Response<any, Record<string, any>>>;
    findAll(res: Response): Promise<Response<any, Record<string, any>>>;
    findOne(id: string, res: Response): Promise<Response<any, Record<string, any>>>;
    findJobsByStatus(status: string, res: Response): Promise<Response<any, Record<string, any>>>;
    findJobsByFreelancerId(status: number, id: string, res: Response): Promise<Response<any, Record<string, any>>>;
    findJobsByFreelancerIdgetFeedback(id: string, res: Response): Promise<Response<any, Record<string, any>>>;
    findJobsByCustomerId(status: number, id: string, res: Response): Promise<Response<any, Record<string, any>>>;
    update(id: string, updateJobDto: UpdateJobDto, res: Response, req: any): Promise<Response<any, Record<string, any>>>;
    updateJobStatus(id: string, updateJobDto: UpdateJobStatus, res: Response, req: any): Promise<Response<any, Record<string, any>>>;
    saveFreelancer(jobId: number, freelancerId: number, res: Response, req: any): Promise<Response<any, Record<string, any>>>;
    remove(id: string, res: Response, req: any): Promise<Response<any, Record<string, any>>>;
}
