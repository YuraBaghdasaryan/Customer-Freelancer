import { UserSkillsService } from './user-skills.service';
import { CreateUserSkillDto } from './dto/create-user-skill.dto';
import { Response } from 'express';
export declare class UserSkillsController {
    private readonly userSkillsService;
    constructor(userSkillsService: UserSkillsService);
    create(createUserSkillDto: CreateUserSkillDto, res: Response, req: any): Promise<Response<any, Record<string, any>>>;
    findSkillByFreelacerId(id: number, res: Response): Promise<Response<any, Record<string, any>>>;
    remove(id: string, res: Response): Promise<Response<any, Record<string, any>>>;
}
