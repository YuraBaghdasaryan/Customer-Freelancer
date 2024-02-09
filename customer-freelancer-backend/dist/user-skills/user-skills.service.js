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
exports.UserSkillsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const skill_entity_1 = require("../skills/entities/skill.entity");
const user_entity_1 = require("../user/entities/user.entity");
const typeorm_2 = require("typeorm");
const user_skill_entity_1 = require("./entities/user-skill.entity");
let UserSkillsService = class UserSkillsService {
    constructor(userSkillRepository, skillRepository, userRepository) {
        this.userSkillRepository = userSkillRepository;
        this.skillRepository = skillRepository;
        this.userRepository = userRepository;
    }
    async create(createUserSkillDto) {
        console.log(createUserSkillDto);
        const skill = await this.skillRepository.findOneBy({ id: createUserSkillDto.skillId });
        if (!skill) {
            throw new common_1.NotFoundException('Oops! skills not found');
        }
        const user = await this.userRepository.findOneBy({ id: createUserSkillDto.freelancerId });
        if (!user) {
            throw new common_1.NotFoundException('Oops! user not found');
        }
        if (user.role != 2) {
            throw new common_1.NotFoundException('Oops! you do not have access');
        }
        const us = await this.userRepository.findOne({ where: { id: createUserSkillDto.freelancerId }, relations: { freelancer: true } });
        const userskill = await this.userSkillRepository.find({
            where: {
                skillId: createUserSkillDto.skillId,
                freelancerId: us.freelancer[0].id
            },
        });
        if (userskill.length) {
            throw new common_1.NotFoundException('Oops! user skills has already');
        }
        await this.userSkillRepository.save({
            skillId: createUserSkillDto.skillId,
            freelancerId: us.freelancer[0].id
        });
        return 'adds a new user skill';
    }
    async findSkillByFreelacerId(id) {
        const userskill = await this.userSkillRepository.find({
            where: {
                freelancerId: id
            },
            relations: ['skill']
        });
        if (userskill) {
            return userskill;
        }
        else {
            throw new common_1.NotFoundException('Oops! user skills not found');
        }
    }
    async remove(id) {
        const skill = await this.userSkillRepository.findOneBy({ id });
        if (skill) {
            this.userSkillRepository.delete({ id });
            return "delete user skill - " + skill.id;
        }
        else {
            throw new common_1.NotFoundException('Oops! user skills not found');
        }
    }
};
UserSkillsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_skill_entity_1.UserSkill)),
    __param(1, (0, typeorm_1.InjectRepository)(skill_entity_1.Skill)),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], UserSkillsService);
exports.UserSkillsService = UserSkillsService;
//# sourceMappingURL=user-skills.service.js.map