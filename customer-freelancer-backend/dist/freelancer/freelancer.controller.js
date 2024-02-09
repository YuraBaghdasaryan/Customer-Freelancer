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
exports.FreelancerController = void 0;
const common_1 = require("@nestjs/common");
const freelancer_service_1 = require("./freelancer.service");
const update_freelancer_dto_1 = require("./dto/update-freelancer.dto");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const roles_guard_1 = require("../auth/roles.guard");
let FreelancerController = class FreelancerController {
    constructor(freelancerService) {
        this.freelancerService = freelancerService;
    }
    async findAll(res) {
        try {
            const data = await this.freelancerService.findAll();
            return res.status(common_1.HttpStatus.OK).json(data);
        }
        catch (e) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json({ error: e.message });
        }
    }
    async findOne(id, res) {
        try {
            const data = await this.freelancerService.findOne(+id);
            return res.status(common_1.HttpStatus.OK).json(data);
        }
        catch (e) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json({ error: e.message });
        }
    }
    async findUserBySkillAndSalary(skill, minsalary, maxsalary, res) {
        console.log(':hi');
        try {
            const data = await this.freelancerService.findUserBySkillAndSalary({ skill, minsalary, maxsalary });
            return res.status(common_1.HttpStatus.OK).json(data);
        }
        catch (e) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json({
                error: e.message
            });
        }
    }
    async update(id, res, updateFreelancerDto) {
        try {
            const data = await this.freelancerService.update(+id, updateFreelancerDto);
            return res.status(common_1.HttpStatus.OK).json(data);
        }
        catch (e) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json({ error: e.message });
        }
    }
};
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiResponse)({ description: "վերադարձնում է բոլոր այն մարդկանց տվյալները, ովքեր գրանցվել են որպես freelncer " }),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FreelancerController.prototype, "findAll", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiResponse)({ description: "վերադարձնում է freelncer-ի տվյալը ըստ իր id-ի" }),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], FreelancerController.prototype, "findOne", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiResponse)({ description: "հնարավորություն է տալիս search իրականացնել ըստ skill-ի, minSalary կամ maxSalary,\n հնարավոր է նաև տվյալները չլրացնել" }),
    (0, common_1.Get)("find/freelancerBySkillAndSalary"),
    __param(0, (0, common_1.Query)("skills")),
    __param(1, (0, common_1.Query)("min-salary")),
    __param(2, (0, common_1.Query)("max-salary")),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number, Object]),
    __metadata("design:returntype", Promise)
], FreelancerController.prototype, "findUserBySkillAndSalary", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiResponse)({ description: "հնարավորություն է տալիս freelancer-ի տվյալներ թարմացնել-> salary, profesion" }),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, update_freelancer_dto_1.UpdateFreelancerDto]),
    __metadata("design:returntype", Promise)
], FreelancerController.prototype, "update", null);
FreelancerController = __decorate([
    (0, swagger_1.ApiTags)("Freelancer*"),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('freelancer'),
    __metadata("design:paramtypes", [freelancer_service_1.FreelancerService])
], FreelancerController);
exports.FreelancerController = FreelancerController;
//# sourceMappingURL=freelancer.controller.js.map