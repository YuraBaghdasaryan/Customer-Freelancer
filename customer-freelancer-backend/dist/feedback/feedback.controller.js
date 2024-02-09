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
exports.FeedbackController = void 0;
const common_1 = require("@nestjs/common");
const feedback_service_1 = require("./feedback.service");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const roles_guard_1 = require("../auth/roles.guard");
const has_roles_decorator_1 = require("../auth/has-roles.decorator");
const role_enum_1 = require("../user/role/role.enum");
const CreateFeedbackDto_1 = require("./dto/CreateFeedbackDto");
let FeedbackController = class FeedbackController {
    constructor(feedbackService) {
        this.feedbackService = feedbackService;
    }
    async create(jobId, createFeedbackDto, res, req) {
        try {
            const data = await this.feedbackService.create(Object.assign(Object.assign({}, createFeedbackDto), { user: req.user, jobId }));
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
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiResponse)({ description: "customer-ին հնարավորություն է տալիս ավարտված job-ի համար գրել feedback,\n ընդ որում ամեն մի job-ի համար հնարավոր է գրել միայն մի feedback\n և feedback կարող է գրել այն customer ով այդ job-ը ավելացրել է" }),
    (0, common_1.Post)(":jobId"),
    __param(0, (0, common_1.Param)("jobId")),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __param(3, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, CreateFeedbackDto_1.CreateFeedbackDto, Object, Object]),
    __metadata("design:returntype", Promise)
], FeedbackController.prototype, "create", null);
FeedbackController = __decorate([
    (0, common_1.Controller)('feedback'),
    (0, swagger_1.ApiTags)("Feedback*"),
    __metadata("design:paramtypes", [feedback_service_1.FeedbackService])
], FeedbackController);
exports.FeedbackController = FeedbackController;
//# sourceMappingURL=feedback.controller.js.map