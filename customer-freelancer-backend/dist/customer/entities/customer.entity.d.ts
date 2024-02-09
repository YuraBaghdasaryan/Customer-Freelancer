import { Job } from "src/jobs/entities/job.entity";
import { User } from "src/user/entities/user.entity";
export declare class Customer {
    id: number;
    userId: number;
    description: string;
    user: User;
    jobs: Job[];
}
