import { Repository } from 'typeorm';
import { CreateFreelancerDto } from './dto/create-freelancer.dto';
import { UpdateFreelancerDto } from './dto/update-freelancer.dto';
import { Freelancer } from './entities/freelancer.entity';
export declare class FreelancerService {
    private freelancerRepository;
    constructor(freelancerRepository: Repository<Freelancer>);
    create(createFreelancerDto: CreateFreelancerDto): Promise<string>;
    findAll(): Promise<Freelancer[]>;
    findOne(id: number): Promise<{
        avg: number;
        id: number;
        userId: number;
        user: import("../user/entities/user.entity").User;
        salary: number;
        profession: string;
        skills: import("../user-skills/entities/user-skill.entity").UserSkill[];
        applay: import("../job-user/entities/job-user.entity").JobUser[];
        jobs: import("../jobs/entities/job.entity").Job[];
    }>;
    findUserBySkillAndSalary({ skill, minsalary, maxsalary }: {
        skill: string;
        minsalary: number;
        maxsalary: number;
    }): Promise<any>;
    update(id: number, updateFreelancerDto: UpdateFreelancerDto): Promise<string>;
}
