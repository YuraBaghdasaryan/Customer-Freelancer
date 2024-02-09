import { Freelancer } from 'src/freelancer/entities/freelancer.entity';
import { Job } from 'src/jobs/entities/job.entity';
export declare class JobUser {
    id: number;
    freelancerId: number;
    jobId: number;
    freelancer: Freelancer;
    job: Job;
}
