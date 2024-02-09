import { Job } from 'src/jobs/entities/job.entity';
import { Skill } from 'src/skills/entities/skill.entity';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { JobSkill } from './entities/job-skill.entity';
export declare class JobSkillService {
    private jobSkillRepository;
    private skillRepository;
    private jobRepository;
    private userRepository;
    constructor(jobSkillRepository: Repository<JobSkill>, skillRepository: Repository<Skill>, jobRepository: Repository<Job>, userRepository: Repository<User>);
    create({ userId, jobId, skillId }: any): Promise<string>;
    findSkillByJobId(id: number): Promise<JobSkill[]>;
    remove({ id, userId }: {
        id: number;
        userId: number;
    }): Promise<string>;
}
