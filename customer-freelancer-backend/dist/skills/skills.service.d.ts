import { NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { Skill } from './entities/skill.entity';
export declare class SkillsService {
    private skillRepository;
    constructor(skillRepository: Repository<Skill>);
    create(createSkillDto: CreateSkillDto): Promise<string>;
    findAll(): Promise<Skill[]>;
    findOne(id: number): Promise<Skill>;
    findJobBySkillId(id: number): Promise<Skill>;
    update(id: number, updateSkillDto: UpdateSkillDto): Promise<string | NotFoundException>;
    remove(id: number): Promise<string>;
}
