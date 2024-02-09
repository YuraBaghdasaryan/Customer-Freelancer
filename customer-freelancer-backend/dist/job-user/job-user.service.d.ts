import { Job } from 'src/jobs/entities/job.entity';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { JobUser } from './entities/job-user.entity';
export declare class JobUserService {
    private jobUserRepository;
    private userRepository;
    private jobRepository;
    constructor(jobUserRepository: Repository<JobUser>, userRepository: Repository<User>, jobRepository: Repository<Job>);
    create(createJobUserDto: any): Promise<string>;
    findByJobId(id: number): Promise<JobUser[]>;
    findByUserId(id: number): Promise<JobUser[]>;
    remove(id: number): Promise<string>;
}
