"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobUserModule = void 0;
const common_1 = require("@nestjs/common");
const job_user_service_1 = require("./job-user.service");
const job_user_controller_1 = require("./job-user.controller");
const typeorm_1 = require("@nestjs/typeorm");
const job_user_entity_1 = require("./entities/job-user.entity");
const user_entity_1 = require("../user/entities/user.entity");
const job_entity_1 = require("../jobs/entities/job.entity");
let JobUserModule = class JobUserModule {
};
JobUserModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([job_user_entity_1.JobUser, user_entity_1.User, job_entity_1.Job])],
        controllers: [job_user_controller_1.JobUserController],
        providers: [job_user_service_1.JobUserService]
    })
], JobUserModule);
exports.JobUserModule = JobUserModule;
//# sourceMappingURL=job-user.module.js.map