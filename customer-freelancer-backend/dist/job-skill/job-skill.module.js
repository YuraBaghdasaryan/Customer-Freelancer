"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobSkillModule = void 0;
const common_1 = require("@nestjs/common");
const job_skill_service_1 = require("./job-skill.service");
const job_skill_controller_1 = require("./job-skill.controller");
const typeorm_1 = require("@nestjs/typeorm");
const job_skill_entity_1 = require("./entities/job-skill.entity");
const skill_entity_1 = require("../skills/entities/skill.entity");
const job_entity_1 = require("../jobs/entities/job.entity");
const user_entity_1 = require("../user/entities/user.entity");
const customer_entity_1 = require("../customer/entities/customer.entity");
let JobSkillModule = class JobSkillModule {
};
JobSkillModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([job_skill_entity_1.JobSkill, skill_entity_1.Skill, job_entity_1.Job, user_entity_1.User, customer_entity_1.Customer])],
        controllers: [job_skill_controller_1.JobSkillController],
        providers: [job_skill_service_1.JobSkillService],
        exports: [job_skill_service_1.JobSkillService]
    })
], JobSkillModule);
exports.JobSkillModule = JobSkillModule;
//# sourceMappingURL=job-skill.module.js.map