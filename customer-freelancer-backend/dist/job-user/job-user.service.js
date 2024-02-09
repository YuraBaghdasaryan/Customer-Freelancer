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
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobUserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const job_entity_1 = require("../jobs/entities/job.entity");
const user_entity_1 = require("../user/entities/user.entity");
const role_enum_1 = require("../user/role/role.enum");
const typeorm_2 = require("typeorm");
const job_user_entity_1 = require("./entities/job-user.entity");
let JobUserService = class JobUserService {
    constructor(jobUserRepository, userRepository, jobRepository) {
        this.jobUserRepository = jobUserRepository;
        this.userRepository = userRepository;
        this.jobRepository = jobRepository;
    }
    async create(createJobUserDto) {
        const user = await this.userRepository.findOne({ where: { id: createJobUserDto.userId }, relations: { freelancer: true } });
        console.log(user);
        if (!user) {
            throw new common_1.NotFoundException('Oops! user not found');
        }
        const job = await this.jobRepository.findOneBy({ id: createJobUserDto.jobId });
        if (!job) {
            throw new common_1.NotFoundException('Oops! job not found');
        }
        if (user.role == role_enum_1.Role.FREELANCER) {
            const userjob = await this.jobUserRepository.findOne({
                where: {
                    freelancerId: user.freelancer[0].id,
                    jobId: createJobUserDto.jobId
                },
            });
            if (userjob) {
                throw new common_1.NotFoundException('Oops! jobUser has already');
            }
            else {
                await this.jobUserRepository.save({ jobId: createJobUserDto.jobId, freelancerId: user.freelancer[0].id });
                return 'adds a new jobUser';
            }
        }
        else {
            throw new common_1.BadRequestException("Ooops! you do not have access");
        }
    }
    async findByJobId(id) {
        const job = await this.jobUserRepository.find({
            where: {
                jobId: id
            },
            relations: ["freelancer", "freelancer.user"]
        });
        if (!job) {
            throw new common_1.NotFoundException("Oops! job not fount");
        }
        else {
            return job;
        }
    }
    async findByUserId(id) {
        const job = await this.jobUserRepository.find({
            where: {
                freelancerId: id
            },
            relations: ['job']
        });
        if (!job) {
            throw new common_1.NotFoundException("Oops! job not fount");
        }
        else {
            return job;
        }
    }
    async remove(id) {
        const job = await this.jobUserRepository.findOneBy({ id });
        if (job) {
            this.jobUserRepository.delete({ id });
            return "delete job - " + job.id;
        }
        else {
            throw new common_1.NotFoundException('Oops! jobUser not found');
        }
    }
};
JobUserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(job_user_entity_1.JobUser)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(job_entity_1.Job)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], JobUserService);
exports.JobUserService = JobUserService;
//# sourceMappingURL=job-user.service.js.map