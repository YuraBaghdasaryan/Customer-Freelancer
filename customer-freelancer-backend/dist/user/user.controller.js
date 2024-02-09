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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const update_user_dto_1 = require("./dto/update-user.dto");
const decorators_1 = require("@nestjs/swagger/dist/decorators");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const roles_guard_1 = require("../auth/roles.guard");
const change_password_dto_1 = require("./dto/change-password.dto");
const forgot_password_1 = require("./dto/forgot-password");
const reset_password_1 = require("./dto/reset-password");
class Verify {
}
__decorate([
    (0, decorators_1.ApiProperty)(),
    __metadata("design:type", String)
], Verify.prototype, "email", void 0);
__decorate([
    (0, decorators_1.ApiProperty)(),
    __metadata("design:type", String)
], Verify.prototype, "emailToken", void 0);
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async verify(user, res) {
        try {
            const data = await this.userService.verify(user);
            return res.status(common_1.HttpStatus.OK).json(data);
        }
        catch (e) {
            return res.status(common_1.HttpStatus.OK).json({ error: e.message });
        }
    }
    async findAll(res) {
        try {
            const data = await this.userService.findAll();
            return res.status(common_1.HttpStatus.OK).json(data);
        }
        catch (e) {
            return res.status(common_1.HttpStatus.OK).json({
                error: e.message
            });
        }
    }
    async changePassword(changePassword, res, req) {
        try {
            const data = await this.userService.changePassword(changePassword, req.user.userId);
            return res.status(common_1.HttpStatus.OK).json(data);
        }
        catch (e) {
            return res.status(common_1.HttpStatus.OK).json({ message: e.message });
        }
    }
    async update(id, updateUserDto, res) {
        try {
            const data = await this.userService.update(+id, updateUserDto);
            return res.status(common_1.HttpStatus.OK).json(data);
        }
        catch (e) {
            return res.status(common_1.HttpStatus.OK).json({
                error: e.message
            });
        }
    }
    async forgotPassword(forgotPassword, res, req) {
        try {
            const data = await this.userService.forgotPassword(forgotPassword);
            return res.status(common_1.HttpStatus.OK).json(data);
        }
        catch (e) {
            return res.status(common_1.HttpStatus.OK).json({ message: e.message });
        }
    }
    async resetPassword(resetPassword, email, res, req) {
        try {
            const data = await this.userService.resetPassword(resetPassword, email);
            return res.status(common_1.HttpStatus.OK).json(data);
        }
        catch (e) {
            return res.status(common_1.HttpStatus.OK).json({ message: e.message });
        }
    }
    async remove(id, res) {
        try {
            const data = await this.userService.remove(+id);
            return res.status(common_1.HttpStatus.OK).json(data);
        }
        catch (e) {
            return res.status(common_1.HttpStatus.OK).json({
                error: e.message
            });
        }
    }
};
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, decorators_1.ApiResponse)({ description: "գրանցվելիս հարկավոր է իրականացնել վերիֆիկացիա ըստ email, հարցմանը հարկավոր է ուղարկել 2 տվյալ email և emailToken, որը հարկավոր է վերցնել path-ից" }),
    (0, common_1.Post)("/verify"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Verify, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "verify", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, decorators_1.ApiBearerAuth)('JWT-auth'),
    (0, decorators_1.ApiResponse)({ description: "հնարավորություն է տալիս վերցնել բոլոր user-ի տվյալները" }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findAll", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, decorators_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, decorators_1.ApiResponse)({ description: "հնարավորություն է տալիս փոփոխել user-ի password" }),
    (0, common_1.Patch)('/us/changepassword'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [change_password_dto_1.ChangePasswordDto, Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "changePassword", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, decorators_1.ApiBearerAuth)('JWT-auth'),
    (0, decorators_1.ApiResponse)({ description: "հնարավորություն է տալիս փոփոխել user-ի տվյալները -> name, surname" }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_dto_1.UpdateUserDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "update", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Patch)('/us/forgotPassword'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [forgot_password_1.ForgotPassword, Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "forgotPassword", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Patch)('/us/resetPassword/:email'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)("email")),
    __param(2, (0, common_1.Res)()),
    __param(3, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [reset_password_1.ResetPassword, String, Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "resetPassword", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, decorators_1.ApiResponse)({ description: "հնարավորություն է տալիս ջնջել user-ին" }),
    (0, decorators_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "remove", null);
UserController = __decorate([
    (0, decorators_1.ApiTags)("User*"),
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map