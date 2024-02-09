import { Freelancer } from 'src/freelancer/entities/freelancer.entity';
import { Skill } from 'src/skills/entities/skill.entity';
export declare class UserSkill {
    id: number;
    skillId: number;
    freelancerId: number;
    freelancer: Freelancer;
    skill: Skill;
}
