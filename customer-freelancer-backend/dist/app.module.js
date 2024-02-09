"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_module_1 = require("./auth/auth.module");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./user/entities/user.entity");
const user_module_1 = require("./user/user.module");
const skills_module_1 = require("./skills/skills.module");
const user_skills_module_1 = require("./user-skills/user-skills.module");
const skill_entity_1 = require("./skills/entities/skill.entity");
const user_skill_entity_1 = require("./user-skills/entities/user-skill.entity");
const jobs_module_1 = require("./jobs/jobs.module");
const job_user_module_1 = require("./job-user/job-user.module");
const feedback_module_1 = require("./feedback/feedback.module");
const mailer_1 = require("@nestjs-modules/mailer");
const job_skill_module_1 = require("./job-skill/job-skill.module");
const job_entity_1 = require("./jobs/entities/job.entity");
const job_skill_entity_1 = require("./job-skill/entities/job-skill.entity");
const job_user_entity_1 = require("./job-user/entities/job-user.entity");
const customer_module_1 = require("./customer/customer.module");
const freelancer_module_1 = require("./freelancer/freelancer.module");
const customer_entity_1 = require("./customer/entities/customer.entity");
const freelancer_entity_1 = require("./freelancer/entities/freelancer.entity");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: 'localhost',
                port: 3306,
                username: 'root',
                password: '',
                database: 'customer-freelancer',
                entities: [user_entity_1.User, skill_entity_1.Skill, user_skill_entity_1.UserSkill, job_entity_1.Job, job_skill_entity_1.JobSkill, job_user_entity_1.JobUser, customer_entity_1.Customer, freelancer_entity_1.Freelancer],
                synchronize: true,
            }),
            mailer_1.MailerModule.forRoot({
                transport: {
                    host: 'smtp.gmail.com',
                    port: 465,
                    secure: true,
                    auth: {
                        user: 'yurabaghdasaryan889@gmail.com',
                        pass: 'ubdh xfun vzgt gowf',
                    },
                },
            }),
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            customer_module_1.CustomerModule,
            freelancer_module_1.FreelancerModule,
            skills_module_1.SkillsModule,
            user_skills_module_1.UserSkillsModule,
            jobs_module_1.JobsModule,
            job_skill_module_1.JobSkillModule,
            job_user_module_1.JobUserModule,
            feedback_module_1.FeedbackModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map