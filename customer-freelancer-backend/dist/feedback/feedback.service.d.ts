import { Job } from 'src/jobs/entities/job.entity';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
export declare class FeedbackService {
    private userRepository;
    private jobRepository;
    constructor(userRepository: Repository<User>, jobRepository: Repository<Job>);
    create(createFeedbackDto: any): Promise<string>;
}
