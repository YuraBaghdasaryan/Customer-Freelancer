import { Customer } from 'src/customer/entities/customer.entity';
import { Freelancer } from 'src/freelancer/entities/freelancer.entity';
import { JobSkill } from 'src/job-skill/entities/job-skill.entity';
import { JobUser } from 'src/job-user/entities/job-user.entity';
import { StatusEnum } from '../status/status.enum';
export declare class Job {
    id: number;
    title: string;
    description: string;
    price: number;
    customerId: number;
    freelancerId: number;
    status: StatusEnum;
    rate: number;
    text: string;
    customer: Customer;
    freelancer: Freelancer;
    jobSkills: JobSkill[];
    jobUsers: JobUser[];
}
