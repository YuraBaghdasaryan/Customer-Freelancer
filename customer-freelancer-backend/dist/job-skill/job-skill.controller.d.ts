import { JobSkillService } from './job-skill.service';
import { CreateJobSkillDto } from './dto/create-job-skill.dto';
import { Response } from 'express';
export declare class JobSkillController {
    private readonly jobSkillService;
    constructor(jobSkillService: JobSkillService);
    create(createJobSkillDto: CreateJobSkillDto, res: Response, req: any): Promise<Response<any, Record<string, any>>>;
    remove(id: string, res: Response, req: any): Promise<Response<any, Record<string, any>>>;
}
