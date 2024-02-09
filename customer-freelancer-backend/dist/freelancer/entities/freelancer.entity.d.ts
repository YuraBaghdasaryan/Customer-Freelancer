import { JobUser } from "src/job-user/entities/job-user.entity";
import { Job } from "src/jobs/entities/job.entity";
import { UserSkill } from "src/user-skills/entities/user-skill.entity";
import { User } from "src/user/entities/user.entity";
export declare class Freelancer {
    id: number;
    userId: number;
    user: User;
    salary: number;
    profession: string;
    skills: UserSkill[];
    applay: JobUser[];
    jobs: Job[];
}
