import { Skill } from 'src/skills/entities/skill.entity';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { UserSkill } from './entities/user-skill.entity';
export declare class UserSkillsService {
    private userSkillRepository;
    private skillRepository;
    private userRepository;
    constructor(userSkillRepository: Repository<UserSkill>, skillRepository: Repository<Skill>, userRepository: Repository<User>);
    create(createUserSkillDto: any): Promise<string>;
    findSkillByFreelacerId(id: number): Promise<UserSkill[]>;
    remove(id: number): Promise<string>;
}
