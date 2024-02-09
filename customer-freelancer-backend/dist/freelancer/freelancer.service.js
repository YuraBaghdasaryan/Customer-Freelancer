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
exports.FreelancerService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const freelancer_entity_1 = require("./entities/freelancer.entity");
let FreelancerService = class FreelancerService {
    constructor(freelancerRepository) {
        this.freelancerRepository = freelancerRepository;
    }
    async create(createFreelancerDto) {
        await this.freelancerRepository.save(createFreelancerDto);
        return 'This action adds a new freelancer';
    }
    async findAll() {
        return this.freelancerRepository.find({
            relations: {
                user: true
            }
        });
    }
    async findOne(id) {
        const user = await this.freelancerRepository
            .createQueryBuilder('freelancer')
            .where('freelancer.id = :id', { id })
            .leftJoinAndSelect('freelancer.jobs', 'job')
            .leftJoinAndSelect('freelancer.user', 'user')
            .andWhere("job.status = 2")
            .leftJoinAndSelect('job.customer', 'customer')
            .select(["job.id", "job.title", "job.description", "job.price", "job.status", "job.rate", "customer", "freelancer.id", "user.name", "user.surname", "user.email", "freelancer.profession", "freelancer.salary"])
            .getOne();
        const avg = user.jobs.filter(elm => elm.rate).reduce((a, b) => a + b.rate, 0) / user.jobs.filter(elm => elm.rate).length;
        return Object.assign(Object.assign({}, user), { avg });
    }
    async findUserBySkillAndSalary({ skill, minsalary, maxsalary }) {
        if (!minsalary) {
            minsalary = 0;
        }
        if (!maxsalary) {
            const q = await this.freelancerRepository.find({
                order: {
                    salary: "DESC",
                },
                take: 1
            });
            if (q.length) {
                maxsalary = q[0].salary;
            }
        }
        console.log(minsalary, maxsalary, skill);
        let freelancer = undefined;
        if (skill && skill != ' ') {
            freelancer = await this.freelancerRepository
                .createQueryBuilder('freelancer')
                .innerJoinAndSelect('freelancer.user', "user")
                .where('freelancer.salary >= :minsalary', { minsalary })
                .andWhere('freelancer.salary <= :maxsalary', { maxsalary })
                .leftJoinAndSelect("freelancer.skills", "user_skill")
                .leftJoinAndSelect("user_skill.skill", "skill")
                .andWhere("skill.name = :skill", { skill })
                .getMany();
        }
        else {
            freelancer = await this.freelancerRepository
                .createQueryBuilder('freelancer')
                .innerJoinAndSelect('freelancer.user', "user")
                .where('freelancer.salary >= :minsalary', { minsalary })
                .andWhere('freelancer.salary <= :maxsalary', { maxsalary })
                .leftJoinAndSelect("freelancer.skills", "user_skill")
                .leftJoinAndSelect("user_skill.skill", "skill")
                .getMany();
        }
        if (!freelancer) {
            throw new common_1.UnauthorizedException("freelancer not fount");
        }
        else {
            return freelancer;
        }
    }
    async update(id, updateFreelancerDto) {
        const us = await this.freelancerRepository.findOneBy({ id });
        if (us) {
            this.freelancerRepository.update({ id }, updateFreelancerDto);
            return "delete freelancer - " + us.id;
        }
        else {
            throw new common_1.NotFoundException('Oops! freelancer not found');
        }
    }
};
FreelancerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(freelancer_entity_1.Freelancer)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], FreelancerService);
exports.FreelancerService = FreelancerService;
//# sourceMappingURL=freelancer.service.js.map