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
exports.Job = void 0;
const customer_entity_1 = require("../../customer/entities/customer.entity");
const freelancer_entity_1 = require("../../freelancer/entities/freelancer.entity");
const job_skill_entity_1 = require("../../job-skill/entities/job-skill.entity");
const job_user_entity_1 = require("../../job-user/entities/job-user.entity");
const typeorm_1 = require("typeorm");
const status_enum_1 = require("../status/status.enum");
let Job = class Job {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Job.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Job.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Job.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Job.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)("int"),
    __metadata("design:type", Number)
], Job.prototype, "customerId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Job.prototype, "freelancerId", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Job.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: null, nullable: true }),
    __metadata("design:type", Number)
], Job.prototype, "rate", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Job.prototype, "text", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => customer_entity_1.Customer, customer => customer.jobs, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
    }),
    __metadata("design:type", customer_entity_1.Customer)
], Job.prototype, "customer", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => freelancer_entity_1.Freelancer, freelancer => freelancer.jobs, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
    }),
    __metadata("design:type", freelancer_entity_1.Freelancer)
], Job.prototype, "freelancer", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(type => job_skill_entity_1.JobSkill, job => job.job, { cascade: true }),
    __metadata("design:type", Array)
], Job.prototype, "jobSkills", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(type => job_user_entity_1.JobUser, job => job.job, { cascade: true }),
    __metadata("design:type", Array)
], Job.prototype, "jobUsers", void 0);
Job = __decorate([
    (0, typeorm_1.Entity)()
], Job);
exports.Job = Job;
//# sourceMappingURL=job.entity.js.map