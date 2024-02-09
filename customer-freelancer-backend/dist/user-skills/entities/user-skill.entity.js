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
exports.UserSkill = void 0;
const freelancer_entity_1 = require("../../freelancer/entities/freelancer.entity");
const skill_entity_1 = require("../../skills/entities/skill.entity");
const typeorm_1 = require("typeorm");
let UserSkill = class UserSkill {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], UserSkill.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], UserSkill.prototype, "skillId", void 0);
__decorate([
    (0, typeorm_1.Column)("int"),
    __metadata("design:type", Number)
], UserSkill.prototype, "freelancerId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => freelancer_entity_1.Freelancer, freelancer => freelancer.skills, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
    }),
    __metadata("design:type", freelancer_entity_1.Freelancer)
], UserSkill.prototype, "freelancer", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => skill_entity_1.Skill, skill => skill.freelancer, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
    }),
    __metadata("design:type", skill_entity_1.Skill)
], UserSkill.prototype, "skill", void 0);
UserSkill = __decorate([
    (0, typeorm_1.Entity)()
], UserSkill);
exports.UserSkill = UserSkill;
//# sourceMappingURL=user-skill.entity.js.map