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
exports.JobUser = void 0;
const freelancer_entity_1 = require("../../freelancer/entities/freelancer.entity");
const job_entity_1 = require("../../jobs/entities/job.entity");
const typeorm_1 = require("typeorm");
let JobUser = class JobUser {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], JobUser.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)("int"),
    __metadata("design:type", Number)
], JobUser.prototype, "freelancerId", void 0);
__decorate([
    (0, typeorm_1.Column)("int"),
    __metadata("design:type", Number)
], JobUser.prototype, "jobId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => freelancer_entity_1.Freelancer, freelancer => freelancer.applay, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
    }),
    __metadata("design:type", freelancer_entity_1.Freelancer)
], JobUser.prototype, "freelancer", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => job_entity_1.Job, job => job.jobUsers, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
    }),
    __metadata("design:type", job_entity_1.Job)
], JobUser.prototype, "job", void 0);
JobUser = __decorate([
    (0, typeorm_1.Entity)()
], JobUser);
exports.JobUser = JobUser;
//# sourceMappingURL=job-user.entity.js.map