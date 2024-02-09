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
exports.JobUserController = void 0;
const common_1 = require("@nestjs/common");
const job_user_service_1 = require("./job-user.service");
const create_job_user_dto_1 = require("./dto/create-job-user.dto");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const roles_guard_1 = require("../auth/roles.guard");
const has_roles_decorator_1 = require("../auth/has-roles.decorator");
const role_enum_1 = require("../user/role/role.enum");
let JobUserController = class JobUserController {
    constructor(jobUserService) {
        this.jobUserService = jobUserService;
    }
    async create(createJobUserDto, res, req) {
        try {
            const data = await this.jobUserService.create(Object.assign(Object.assign({}, createJobUserDto), { userId: req.user.userId }));
            return res.status(common_1.HttpStatus.OK).json(data);
        }
        catch (e) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json({
                error: e.message
            });
        }
    }
    async findByJobId(id, res) {
        try {
            const data = await this.jobUserService.findByJobId(+id);
            return res.status(common_1.HttpStatus.OK).json(data);
        }
        catch (e) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json({
                error: e.message
            });
        }
    }
    async findByUserId(id, res) {
        try {
            const data = await this.jobUserService.findByUserId(+id);
            return res.status(common_1.HttpStatus.OK).json(data);
        }
        catch (e) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json({
                error: e.message
            });
        }
    }
    async remove(id, res, req) {
        try {
            const data = await this.jobUserService.remove(+id);
            return res.status(common_1.HttpStatus.OK).json(data);
        }
        catch (e) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json({
                error: e.message
            });
        }
    }
};
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiResponse)({ description: "freelancer-ին հնարավորություն է տալիս աշխատանքի համար հայտ ուղարկել" }),
    (0, has_roles_decorator_1.HasRoles)(role_enum_1.Role.FREELANCER),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_job_user_dto_1.CreateJobUserDto, Object, Object]),
    __metadata("design:returntype", Promise)
], JobUserController.prototype, "create", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiResponse)({ description: "հնարավորություն է տալիս ըստ jobId-ի տեսնել բոլոր freelancer-ների" }),
    (0, common_1.Get)('findByJobId/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], JobUserController.prototype, "findByJobId", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiResponse)({ description: "հնարավորություն է տալիս ըստ freelancerId-ի տեսնել բոլոր job-ների" }),
    (0, common_1.Get)('findByUserId/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], JobUserController.prototype, "findByUserId", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiResponse)({ description: "հնարավորություն է տալիս ջնջել freelancer-ի ուղարկած հայտը " }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], JobUserController.prototype, "remove", null);
JobUserController = __decorate([
    (0, common_1.Controller)('job-user'),
    (0, swagger_1.ApiTags)('JobUser*'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [job_user_service_1.JobUserService])
], JobUserController);
exports.JobUserController = JobUserController;
//# sourceMappingURL=job-user.controller.js.map