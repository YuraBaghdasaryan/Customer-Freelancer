import { SkillsService } from './skills.service';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { Response } from 'express';
export declare class SkillsController {
    private readonly skillsService;
    constructor(skillsService: SkillsService);
    create(createSkillDto: CreateSkillDto, res: Response, req: any): Promise<Response<any, Record<string, any>>>;
    findAll(res: Response): Promise<Response<any, Record<string, any>>>;
    findOne(id: string, res: Response): Promise<Response<any, Record<string, any>>>;
    findJobBySkillId(id: string, res: Response): Promise<Response<any, Record<string, any>>>;
    update(id: string, updateSkillDto: UpdateSkillDto, res: Response, req: any): Promise<Response<any, Record<string, any>>>;
    remove(id: string, res: Response, req: any): Promise<Response<any, Record<string, any>>>;
}
