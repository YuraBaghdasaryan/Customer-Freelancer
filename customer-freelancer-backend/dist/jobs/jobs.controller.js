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
exports.JobsController = void 0;
const common_1 = require("@nestjs/common");
const jobs_service_1 = require("./jobs.service");
const create_job_dto_1 = require("./dto/create-job.dto");
const update_job_dto_1 = require("./dto/update-job.dto");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const roles_guard_1 = require("../auth/roles.guard");
const has_roles_decorator_1 = require("../auth/has-roles.decorator");
const role_enum_1 = require("../user/role/role.enum");
let JobsController = class JobsController {
    constructor(jobsService) {
        this.jobsService = jobsService;
    }
    async create(createJobDto, res, req) {
        try {
            console.log("createJobDto", createJobDto, req.user.customer.id);
            const data = await this.jobsService.create(Object.assign(Object.assign({}, createJobDto), { customerId: req.user.customer.id }));
            return res.status(common_1.HttpStatus.OK).json(data);
        }
        catch (e) {
            return res.status(common_1.HttpStatus.OK).json({ error: e.message });
        }
    }
    async findAll(res) {
        try {
            const data = await this.jobsService.findAll();
            return res.status(common_1.HttpStatus.OK).json(data);
        }
        catch (e) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json({ error: e.message });
        }
    }
    async findOne(id, res) {
        try {
            const data = await this.jobsService.findOne(+id);
            return res.status(common_1.HttpStatus.OK).json(data);
        }
        catch (e) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json({ error: e.message });
        }
    }
    async findJobsByStatus(status, res) {
        try {
            const data = await this.jobsService.findJobsByStatus(+status);
            return res.status(common_1.HttpStatus.OK).json(data);
        }
        catch (e) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json({ error: e.message });
        }
    }
    async findJobsByFreelancerId(status, id, res) {
        try {
            const data = await this.jobsService.findJobsByFreelancerId(+id, status);
            return res.status(common_1.HttpStatus.OK).json(data);
        }
        catch (e) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json({ error: e.message });
        }
    }
    async findJobsByFreelancerIdgetFeedback(id, res) {
        try {
            const data = await this.jobsService.findJobsByFreelancerIdgetFeedback(+id);
            return res.status(common_1.HttpStatus.OK).json(data);
        }
        catch (e) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json({ error: e.message });
        }
    }
    async findJobsByCustomerId(status, id, res) {
        try {
            const data = await this.jobsService.findJobsByCustomerId(+id, status);
            return res.status(common_1.HttpStatus.OK).json(data);
        }
        catch (e) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json({ error: e.message });
        }
    }
    async update(id, updateJobDto, res, req) {
        try {
            const data = await this.jobsService.update(+id, updateJobDto);
            return res.status(common_1.HttpStatus.OK).json(data);
        }
        catch (e) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json({ error: e.message });
        }
    }
    async updateJobStatus(id, updateJobDto, res, req) {
        try {
            const data = await this.jobsService.updateJobStatus(+id, updateJobDto);
            return res.status(common_1.HttpStatus.OK).json(data);
        }
        catch (e) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json({ error: e.message });
        }
    }
    async saveFreelancer(jobId, freelancerId, res, req) {
        try {
            const data = await this.jobsService.saveFreelancer({ jobId, freelancerId });
            return res.status(common_1.HttpStatus.OK).json(data);
        }
        catch (e) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json({ error: e.message });
        }
    }
    async remove(id, res, req) {
        try {
            const data = await this.jobsService.remove(+id);
            return res.status(common_1.HttpStatus.OK).json(data);
        }
        catch (e) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json({ error: e.message });
        }
    }
};
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, has_roles_decorator_1.HasRoles)(role_enum_1.Role.CUSTOMER),
    (0, swagger_1.ApiResponse)({ description: "customer—ին հնարավորություն է տալիս նոր job ավելացնել, որտեղ skills-ը փոխանցում է որպես number[ ]" }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_job_dto_1.CreateJobDto, Object, Object]),
    __metadata("design:returntype", Promise)
], JobsController.prototype, "create", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiResponse)({ description: "հնարավորություն է տալիս տեսնել բոլոր job—երը" }),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], JobsController.prototype, "findAll", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiResponse)({ description: "հնարավորություն է տալիս տեսնել job—ի տվյալները ըստ jobId-ի" }),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], JobsController.prototype, "findOne", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiResponse)({ description: "հնարավորություն է տալիս տեսնել job—ի տվյալները ըստ status-ի" }),
    (0, common_1.Get)('findJobsByStatus/:status'),
    __param(0, (0, common_1.Param)('status')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], JobsController.prototype, "findJobsByStatus", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiResponse)({ description: "հնարավորություն է տալիս տեսնել job—ի տվյալները ըստ freelancerId-ի" }),
    (0, common_1.Get)('findJobsByFreelancerId/:id'),
    __param(0, (0, common_1.Query)("status")),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, Object]),
    __metadata("design:returntype", Promise)
], JobsController.prototype, "findJobsByFreelancerId", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiResponse)({ description: "հնարավորություն է տալիս տեսնել job—ի տվյալները ըստ freelancerId-ի" }),
    (0, common_1.Get)('findJobsByFreelancerId/getRate/getFeedback/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], JobsController.prototype, "findJobsByFreelancerIdgetFeedback", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiResponse)({ description: "հնարավորություն է տալիս տեսնել job—ի տվյալները ըստ customerId-ի" }),
    (0, common_1.Get)('findJobsByCustomerId/:id'),
    __param(0, (0, common_1.Query)("status")),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, Object]),
    __metadata("design:returntype", Promise)
], JobsController.prototype, "findJobsByCustomerId", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiResponse)({ description: "customer—ին հնարավորություն է տալիս թարմացնել job-ի տվյալները -> title, description, price" }),
    (0, has_roles_decorator_1.HasRoles)(role_enum_1.Role.CUSTOMER),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __param(3, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_job_dto_1.UpdateJobDto, Object, Object]),
    __metadata("design:returntype", Promise)
], JobsController.prototype, "update", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiResponse)({ description: "customer—ին հնարավորություն է տալիս թարմացնել job-ի status-ը " }),
    (0, has_roles_decorator_1.HasRoles)(role_enum_1.Role.CUSTOMER),
    (0, common_1.Patch)('updateJobStatus/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __param(3, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_job_dto_1.UpdateJobStatus, Object, Object]),
    __metadata("design:returntype", Promise)
], JobsController.prototype, "updateJobStatus", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiResponse)({ description: "customer—ին հնարավորություն է տալիս job-ի համար հաստատել freelancer-ին" }),
    (0, has_roles_decorator_1.HasRoles)(role_enum_1.Role.CUSTOMER),
    (0, common_1.Patch)('saveFreelancer/:jobId/:freelancerId'),
    __param(0, (0, common_1.Param)('jobId')),
    __param(1, (0, common_1.Param)('freelancerId')),
    __param(2, (0, common_1.Res)()),
    __param(3, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object, Object]),
    __metadata("design:returntype", Promise)
], JobsController.prototype, "saveFreelancer", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiResponse)({ description: "customer—ին հնարավորություն է տալիս ջնջել job-ը" }),
    (0, has_roles_decorator_1.HasRoles)(role_enum_1.Role.CUSTOMER, role_enum_1.Role.ADMIN),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], JobsController.prototype, "remove", null);
JobsController = __decorate([
    (0, swagger_1.ApiTags)("Jobs*"),
    (0, common_1.Controller)('jobs'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [jobs_service_1.JobsService])
], JobsController);
exports.JobsController = JobsController;
//# sourceMappingURL=jobs.controller.js.map