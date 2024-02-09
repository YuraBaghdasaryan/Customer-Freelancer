import { FreelancerService } from './freelancer.service';
import { UpdateFreelancerDto } from './dto/update-freelancer.dto';
import { Response } from 'express';
export declare class FreelancerController {
    private readonly freelancerService;
    constructor(freelancerService: FreelancerService);
    findAll(res: Response): Promise<Response<any, Record<string, any>>>;
    findOne(id: string, res: Response): Promise<Response<any, Record<string, any>>>;
    findUserBySkillAndSalary(skill: string, minsalary: number, maxsalary: number, res: Response): Promise<Response<any, Record<string, any>>>;
    update(id: string, res: Response, updateFreelancerDto: UpdateFreelancerDto): Promise<Response<any, Record<string, any>>>;
}
