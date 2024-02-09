import { JobSkill } from 'src/job-skill/entities/job-skill.entity';
import { UserSkill } from 'src/user-skills/entities/user-skill.entity';
export declare class Skill {
    id: number;
    name: string;
    freelancer: UserSkill[];
    jobs: JobSkill[];
}
