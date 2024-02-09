"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const freelancer_entity_1 = require("../freelancer/entities/freelancer.entity");
const job_skill_service_1 = require("../job-skill/job-skill.service");
const job_user_entity_1 = require("../job-user/entities/job-user.entity");
const typeorm_2 = require("typeorm");
const job_entity_1 = require("./entities/job.entity");
const status_enum_1 = require("./status/status.enum");
const customer_entity_1 = require("../customer/entities/customer.entity");
let JobsService = class JobsService {
    constructor(jobRepository, freelancerRepository, jobUserRepository, jobSkillsService, customerRepository) {
        this.jobRepository = jobRepository;
        this.freelancerRepository = freelancerRepository;
        this.jobUserRepository = jobUserRepository;
        this.jobSkillsService = jobSkillsService;
        this.customerRepository = customerRepository;
    }
    async create(createJobDto) {
        console.log("=====>", createJobDto);
        const { skills } = createJobDto, data = __rest(createJobDto, ["skills"]);
        const job = await this.jobRepository.save(Object.assign(Object.assign({}, data), { status: status_enum_1.StatusEnum.START, text: "" }));
        const us = await this.customerRepository.findOne({ where: { id: createJobDto.customerId } });
        if (skills && skills.length) {
            for (let e of skills) {
                console.log(job.id, e, skills);
                await this.jobSkillsService.create({ userId: us.userId, jobId: job.id, skillId: e });
            }
        }
        return 'adds a new job';
    }
    async findAll() {
        return this.jobRepository.find();
    }
    async findOne(id) {
        const job = await this.jobRepository.findOne({
            where: {
                id: id
            },
            relations: ["jobSkills", "jobSkills.skill", 'freelancer', 'freelancer.user']
        });
        if (!job) {
            throw new common_1.NotFoundException("Oops! job not fount");
        }
        else {
            return job;
        }
    }
    async findJobsByCustomerId(id, status) {
        if (status) {
            const job = await this.jobRepository.find({
                where: {
                    customerId: id,
                    status
                },
                relations: ["jobSkills", "jobSkills.skill", 'freelancer', 'freelancer.user']
            });
            if (!job) {
                throw new common_1.NotFoundException("Oops! job not fount");
            }
            else {
                return job;
            }
        }
        else {
            const job = await this.jobRepository.find({
                where: {
                    customerId: id
                },
                relations: ["jobSkills", "jobSkills.skill", 'freelancer', 'freelancer.user']
            });
            if (!job) {
                throw new common_1.NotFoundException("Oops! job not fount");
            }
            else {
                return job;
            }
        }
    }
    async findJobsByFreelancerId(id, status) {
        console.log(id, status);
        if (status) {
            const job = await this.jobRepository.find({
                where: {
                    freelancerId: id,
                    status
                },
                relations: ["jobSkills", "jobSkills.skill", 'customer']
            });
            if (!job) {
                throw new common_1.NotFoundException("Oops! job not fount");
            }
            else {
                return job;
            }
        }
        else {
            const job = await this.jobRepository.find({
                where: {
                    freelancerId: id
                },
                relations: ["jobSkills", "jobSkills.skill", 'customer']
            });
            if (!job) {
                throw new common_1.NotFoundException("Oops! job not fount");
            }
            else {
                return job;
            }
        }
    }
    async findJobsByFreelancerIdgetFeedback(id) {
        const job = await this.jobRepository.find({
            where: {
                freelancerId: id,
                status: 2
            },
        });
        return { job, rate: job.reduce((a, b) => a + b.rate, 0) / job.length };
    }
    async findJobsByStatus(status) {
        const job = await this.jobRepository.find({
            where: {
                status
            },
            relations: {
                jobSkills: true
            }
        });
        if (!job) {
            throw new common_1.NotFoundException("Oops! job not fount");
        }
        else {
            return job;
        }
    }
    async update(id, updateJobDto) {
        const job = await this.jobRepository.findOne({
            where: {
                id: id
            }
        });
        if (job) {
            await this.jobRepository.update({ id }, updateJobDto);
            return `Updated job - ${job.title}`;
        }
        else {
            return new common_1.NotFoundException('Oops! job not found');
        }
    }
    async updateJobStatus(id, { status }) {
        const job = await this.jobRepository.findOne({
            where: {
                id: id
            }
        });
        if (job) {
            if (status == 0 || status == 1 || status == 2) {
                await this.jobRepository.update({ id }, { status: status });
                return `Updated job - ${job.title}`;
            }
            else {
                throw new common_1.NotFoundException('Oops! status value invalid');
            }
        }
        else {
            throw new common_1.NotFoundException('Oops! job not found');
        }
    }
    async saveFreelancer({ jobId, freelancerId }) {
        const job = await this.jobRepository.findOne({
            where: {
                id: jobId
            }
        });
        if (!job) {
            throw new common_1.NotFoundException('Oops! job not found');
        }
        const freelancer = await this.freelancerRepository.findOne({
            where: {
                id: freelancerId
            }
        });
        if (!freelancer) {
            throw new common_1.NotFoundException('Oops! freelancer not found');
        }
        await this.jobRepository.update({ id: jobId }, { freelancerId });
        await this.jobUserRepository.delete({ jobId });
        return "update freelancer id";
    }
    async remove(id) {
        const job = await this.jobRepository.findOneBy({ id });
        if (job) {
            this.jobRepository.delete({ id });
            return "delete job - " + job.title;
        }
        else {
            throw new common_1.NotFoundException('Oops! job not found');
        }
    }
};
JobsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(job_entity_1.Job)),
    __param(1, (0, typeorm_1.InjectRepository)(freelancer_entity_1.Freelancer)),
    __param(2, (0, typeorm_1.InjectRepository)(job_user_entity_1.JobUser)),
    __param(4, (0, typeorm_1.InjectRepository)(customer_entity_1.Customer)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        job_skill_service_1.JobSkillService,
        typeorm_2.Repository])
], JobsService);
exports.JobsService = JobsService;
//# sourceMappingURL=jobs.service.js.map