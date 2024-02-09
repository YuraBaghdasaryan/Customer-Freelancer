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
exports.SkillsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const skill_entity_1 = require("./entities/skill.entity");
let SkillsService = class SkillsService {
    constructor(skillRepository) {
        this.skillRepository = skillRepository;
    }
    async create(createSkillDto) {
        const skill = await this.skillRepository.find();
        if (skill.some(elm => elm.name.toLowerCase() == createSkillDto.name.toLowerCase())) {
            throw new common_1.UnauthorizedException(createSkillDto.name + " has already");
        }
        else {
            await this.skillRepository.save(createSkillDto);
            return 'adds a new skill';
        }
    }
    async findAll() {
        return this.skillRepository.find();
    }
    async findOne(id) {
        const skill = await this.skillRepository.findOne({
            where: {
                id: id
            },
            relations: ["freelancer", "freelancer.freelancer"]
        });
        if (!skill) {
            throw new common_1.NotFoundException("Oops! skills not fount");
        }
        else {
            return skill;
        }
    }
    async findJobBySkillId(id) {
        const skill = await this.skillRepository.findOne({
            where: {
                id: id
            },
            relations: ["jobs", "jobs.job"]
        });
        if (!skill) {
            throw new common_1.NotFoundException("Oops! skills  not fount");
        }
        else {
            return skill;
        }
    }
    async update(id, updateSkillDto) {
        const skill = await this.skillRepository.findOne({
            where: {
                id: id
            }
        });
        if (skill) {
            await this.skillRepository.update({ id }, updateSkillDto);
            return 'Updated skill - ' + skill.name;
        }
        else {
            return new common_1.NotFoundException('Oops! skill not found');
        }
    }
    async remove(id) {
        const us = await this.skillRepository.findOneBy({ id });
        if (us) {
            this.skillRepository.delete({ id });
            return "delete skill - " + us.name;
        }
        else {
            throw new common_1.NotFoundException('Oops! skill not found');
        }
    }
};
SkillsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(skill_entity_1.Skill)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], SkillsService);
exports.SkillsService = SkillsService;
//# sourceMappingURL=skills.service.js.map