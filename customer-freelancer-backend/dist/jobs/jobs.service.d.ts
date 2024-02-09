import { NotFoundException } from '@nestjs/common';
import { Freelancer } from 'src/freelancer/entities/freelancer.entity';
import { JobSkillService } from 'src/job-skill/job-skill.service';
import { JobUser } from 'src/job-user/entities/job-user.entity';
import { Repository } from 'typeorm';
import { UpdateJobDto } from './dto/update-job.dto';
import { Job } from './entities/job.entity';
import { Customer } from 'src/customer/entities/customer.entity';
export declare class JobsService {
    private jobRepository;
    private freelancerRepository;
    private jobUserRepository;
    private readonly jobSkillsService;
    private customerRepository;
    constructor(jobRepository: Repository<Job>, freelancerRepository: Repository<Freelancer>, jobUserRepository: Repository<JobUser>, jobSkillsService: JobSkillService, customerRepository: Repository<Customer>);
    create(createJobDto: any): Promise<string>;
    findAll(): Promise<Job[]>;
    findOne(id: number): Promise<Job>;
    findJobsByCustomerId(id: number, status: number): Promise<Job[]>;
    findJobsByFreelancerId(id: number, status: number): Promise<Job[]>;
    findJobsByFreelancerIdgetFeedback(id: number): Promise<{
        job: Job[];
        rate: number;
    }>;
    findJobsByStatus(status: number): Promise<Job[]>;
    update(id: number, updateJobDto: UpdateJobDto): Promise<string | NotFoundException>;
    updateJobStatus(id: number, { status }: {
        status: number;
    }): Promise<string>;
    saveFreelancer({ jobId, freelancerId }: {
        jobId: number;
        freelancerId: number;
    }): Promise<string>;
    remove(id: number): Promise<string>;
}
