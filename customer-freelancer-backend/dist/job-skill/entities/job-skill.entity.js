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
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobSkill = void 0;
const job_entity_1 = require("../../jobs/entities/job.entity");
const skill_entity_1 = require("../../skills/entities/skill.entity");
const typeorm_1 = require("typeorm");
let JobSkill = class JobSkill {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], JobSkill.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], JobSkill.prototype, "skillId", void 0);
__decorate([
    (0, typeorm_1.Column)("int"),
    __metadata("design:type", Number)
], JobSkill.prototype, "jobId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => job_entity_1.Job, job => job.jobSkills, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
    }),
    __metadata("design:type", job_entity_1.Job)
], JobSkill.prototype, "job", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => skill_entity_1.Skill, skill => skill.jobs, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
    }),
    __metadata("design:type", skill_entity_1.Skill)
], JobSkill.prototype, "skill", void 0);
JobSkill = __decorate([
    (0, typeorm_1.Entity)()
], JobSkill);
exports.JobSkill = JobSkill;
//# sourceMappingURL=job-skill.entity.js.map