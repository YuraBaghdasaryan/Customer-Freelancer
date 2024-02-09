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
exports.JobSkillService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const job_entity_1 = require("../jobs/entities/job.entity");
const skill_entity_1 = require("../skills/entities/skill.entity");
const user_entity_1 = require("../user/entities/user.entity");
const typeorm_2 = require("typeorm");
const job_skill_entity_1 = require("./entities/job-skill.entity");
let JobSkillService = class JobSkillService {
    constructor(jobSkillRepository, skillRepository, jobRepository, userRepository) {
        this.jobSkillRepository = jobSkillRepository;
        this.skillRepository = skillRepository;
        this.jobRepository = jobRepository;
        this.userRepository = userRepository;
    }
    async create({ userId, jobId, skillId }) {
        console.log(userId, jobId, skillId);
        const skill = await this.skillRepository.findOneBy({ id: skillId });
        if (!skill) {
            throw new common_1.NotFoundException('Oops! skills not found');
        }
        const job = await this.jobRepository.findOneBy({ id: jobId });
        if (!job) {
            throw new common_1.NotFoundException('Oops! job not found');
        }
        const user = await this.userRepository.findOne({ where: { id: userId }, relations: { customer: true } });
        console.log(user);
        if (!user) {
            throw new common_1.NotFoundException('Oops! user not found');
        }
        if (user.id != userId) {
            throw new common_1.NotFoundException('Oops! you do not have access');
        }
        const userskill = await this.jobSkillRepository.find({
            where: {
                skillId: skillId,
                jobId: jobId
            },
        });
        if (userskill.length) {
            throw new common_1.NotFoundException('Oops! job skills has already');
        }
        else {
            await this.jobSkillRepository.save({ jobId, skillId });
            return 'adds a new job skill';
        }
    }
    async findSkillByJobId(id) {
        const jobSkill = await this.jobSkillRepository.find({
            where: {
                jobId: id
            },
            relations: ['skill']
        });
        if (jobSkill) {
            return jobSkill;
        }
        else {
            throw new common_1.NotFoundException('Oops! job skills not found');
        }
    }
    async remove({ id, userId }) {
        const user = await this.userRepository.findOne({ where: { id: userId }, relations: { freelancer: true } });
        if (!user) {
            throw new common_1.NotFoundException('Oops! user not found');
        }
        if (user.freelancer[0].id != userId) {
            throw new common_1.NotFoundException('Oops! you do not have access');
        }
        else {
            const jskill = await this.jobSkillRepository.findOneBy({ id });
            if (jskill) {
                this.jobSkillRepository.delete({ id });
                return "delete job skill - " + jskill.id;
            }
            else {
                throw new common_1.NotFoundException('Oops! job skills not found');
            }
        }
    }
};
JobSkillService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(job_skill_entity_1.JobSkill)),
    __param(1, (0, typeorm_1.InjectRepository)(skill_entity_1.Skill)),
    __param(2, (0, typeorm_1.InjectRepository)(job_entity_1.Job)),
    __param(3, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], JobSkillService);
exports.JobSkillService = JobSkillService;
//# sourceMappingURL=job-skill.service.js.map