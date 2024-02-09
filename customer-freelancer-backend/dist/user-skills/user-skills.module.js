"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSkillsModule = void 0;
const common_1 = require("@nestjs/common");
const user_skills_service_1 = require("./user-skills.service");
const user_skills_controller_1 = require("./user-skills.controller");
const typeorm_1 = require("@nestjs/typeorm");
const user_skill_entity_1 = require("./entities/user-skill.entity");
const skill_entity_1 = require("../skills/entities/skill.entity");
const user_entity_1 = require("../user/entities/user.entity");
let UserSkillsModule = class UserSkillsModule {
};
UserSkillsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([user_skill_entity_1.UserSkill, skill_entity_1.Skill, user_entity_1.User])],
        controllers: [user_skills_controller_1.UserSkillsController],
        providers: [user_skills_service_1.UserSkillsService]
    })
], UserSkillsModule);
exports.UserSkillsModule = UserSkillsModule;
//# sourceMappingURL=user-skills.module.js.map