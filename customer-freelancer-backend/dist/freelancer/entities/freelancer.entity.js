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
exports.Freelancer = void 0;
const job_user_entity_1 = require("../../job-user/entities/job-user.entity");
const job_entity_1 = require("../../jobs/entities/job.entity");
const user_skill_entity_1 = require("../../user-skills/entities/user-skill.entity");
const user_entity_1 = require("../../user/entities/user.entity");
const typeorm_1 = require("typeorm");
let Freelancer = class Freelancer {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Freelancer.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Freelancer.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => user_entity_1.User, user => user.freelancer, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
    }),
    __metadata("design:type", user_entity_1.User)
], Freelancer.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Freelancer.prototype, "salary", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Freelancer.prototype, "profession", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(type => user_skill_entity_1.UserSkill, usSkill => usSkill.freelancer, { cascade: true }),
    __metadata("design:type", Array)
], Freelancer.prototype, "skills", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(type => job_user_entity_1.JobUser, jobuser => jobuser.freelancer, { cascade: true }),
    __metadata("design:type", Array)
], Freelancer.prototype, "applay", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(type => job_entity_1.Job, job => job.freelancer, { cascade: true }),
    __metadata("design:type", Array)
], Freelancer.prototype, "jobs", void 0);
Freelancer = __decorate([
    (0, typeorm_1.Entity)()
], Freelancer);
exports.Freelancer = Freelancer;
//# sourceMappingURL=freelancer.entity.js.map