import { Job } from 'src/jobs/entities/job.entity';
import { Skill } from 'src/skills/entities/skill.entity';
export declare class JobSkill {
    id: number;
    skillId: number;
    jobId: number;
    job: Job;
    skill: Skill;
}
