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
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const auth_service_1 = require("./auth/auth.service");
const local_auth_guard_1 = require("./auth/local-auth.guard");
const jwt_auth_guard_1 = require("./auth/jwt-auth.guard");
const user_service_1 = require("./user/user.service");
const api_use_tags_decorator_1 = require("@nestjs/swagger/dist/decorators/api-use-tags.decorator");
const swagger_1 = require("@nestjs/swagger");
const create_user_dto_1 = require("./user/dto/create-user.dto");
const login_user_dto_1 = require("./user/dto/login-user.dto");
let AppController = class AppController {
    constructor(appService, userSerevice, authService) {
        this.appService = appService;
        this.userSerevice = userSerevice;
        this.authService = authService;
    }
    async login(us, req) {
        console.log(us);
        return this.authService.login(req.user);
    }
    async create(createUserDto, res) {
        try {
            const data = await this.userSerevice.create(createUserDto);
            return res.status(common_1.HttpStatus.OK).json(data);
        }
        catch (e) {
            return res.status(common_1.HttpStatus.OK).json({ error: e.message });
        }
    }
    async getProfile(req, res) {
        try {
            const data = await this.userSerevice.findOne(req.user.username);
            return res.status(common_1.HttpStatus.OK).json({ user: data });
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
    (0, common_1.UseGuards)(local_auth_guard_1.LocalAuthGuard),
    (0, common_1.Post)('auth/login'),
    (0, swagger_1.ApiResponse)({ description: "հարկավոր է մուտքագրել username և password, որպես պատասխան ստանում ենք access_token" }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_user_dto_1.Login, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "login", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Post)("/register"),
    (0, swagger_1.ApiResponse)({
        description: `profesion և salary դաշտերը լրացնում ենք միյան այն դեպքում, երբ տվյալ մարդը գրանցվում է որպես freelancer։\n
  description դաշտը լրացնում ենք միյան այն դեպքում, երբ տվյալ մարդը գրանցվում է որպես customer\n
  Կարող ենք գրանցում որպես admin(role = 0), customer(role = 1) կամ freelancer(role = 2),\n
   տվյալ էջում կա միայն մեկ admin, էջում գրանցվելիս մարդ ունի ընտրության 2 հնարավորություն customer կամ freelancer`
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "create", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiResponse)({ description: "ըստ access_token -ի վերադարձնում է login եղած մարդու տվյալները" }),
    (0, common_1.Get)('profile'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getProfile", null);
AppController = __decorate([
    (0, api_use_tags_decorator_1.ApiTags)("Auth*"),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [app_service_1.AppService,
        user_service_1.UserService,
        auth_service_1.AuthService])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map