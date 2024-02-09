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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./entities/user.entity");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
const role_enum_1 = require("./role/role.enum");
const dist_1 = require("@nestjs-modules/mailer/dist");
const uuid_1 = require("uuid");
const freelancer_service_1 = require("../freelancer/freelancer.service");
const customer_service_1 = require("../customer/customer.service");
let UserService = class UserService {
    constructor(userRepository, mailerService, freelancerService, customerService) {
        this.userRepository = userRepository;
        this.mailerService = mailerService;
        this.freelancerService = freelancerService;
        this.customerService = customerService;
    }
    async create(createUserDto) {
        console.log("createUserDto=>", createUserDto);
        const users = await this.userRepository.find({
            where: {
                email: createUserDto.email
            }
        });
        console.log(users);
        if (users.length) {
            throw new common_1.UnauthorizedException("Oops! email has already");
        }
        const { password, profession, description, salary } = createUserDto, body = __rest(createUserDto, ["password", "profession", "description", "salary"]);
        const hash = await bcrypt.hash(password, 10);
        const emailToken = (0, uuid_1.v4)();
        const user = this.userRepository.create(Object.assign(Object.assign({}, body), { password: hash, isVerified: 0, emailToken }));
        const us = await this.userRepository.save(user);
        console.log("us=>", us);
        if (us.role == role_enum_1.Role.CUSTOMER) {
            await this.customerService.create({ userId: us.id, description });
        }
        else if (us.role == role_enum_1.Role.FREELANCER) {
            await this.freelancerService.create({
                userId: us.id,
                salary: salary,
                profession: profession
            });
        }
        const url = `http://localhost:3000/verify?email=${body.email}&emailToken=${emailToken}`;
        await this.mailerService.sendMail({
            to: "yurabaghdasaryan889@gmail.com ",
            from: 'yurabaghdasaryan889@gmail.com',
            subject: 'Welcome to CustomerFreelancer page! Confirm your Email',
            html: `Hi! There, You have recently visited 
      our website and entered your email.
      Please follow the given link to verify your email
      <a href='${url}'>click</a>       
      Thanks`
        });
        return "add user";
    }
    findAll() {
        return this.userRepository.find();
    }
    async verify(user) {
        console.log(user);
        const us = await this.userRepository.findOne({
            where: {
                email: user.email,
                emailToken: user.emailToken
            },
            relations: {
                freelancer: true,
                customer: true
            }
        });
        if (us) {
            await this.userRepository.update({ id: us.id }, { emailToken: null, isVerified: 1 });
            return "you are verified";
        }
        else {
            throw new common_1.NotFoundException("Oops! data not found");
        }
    }
    async findOne(username) {
        console.log(username);
        const user = await this.userRepository.findOne({
            where: {
                email: username
            },
            relations: {
                freelancer: true,
                customer: true
            }
        });
        if (!user) {
            throw new common_1.UnauthorizedException("Oops!  user not fount");
        }
        else {
            if (user.freelancer[0]) {
                user.freelancer = user.freelancer[0];
            }
            else {
                delete user.freelancer;
            }
            if (user.customer[0]) {
                user.customer = user.customer[0];
            }
            else {
                delete user.customer;
            }
            return user;
        }
    }
    async changePassword(data, id) {
        const user = await this.userRepository.findOneBy({ id });
        console.log(user);
        let comp1 = bcrypt.compareSync(data.currentPassword, user.password);
        let comp = bcrypt.compareSync(data.password, user.password);
        console.log(data);
        console.log(comp1);
        if (!comp1) {
            throw new common_1.HttpException('Wrong passwors', common_1.HttpStatus.BAD_REQUEST);
        }
        if (!!comp) {
            throw new common_1.HttpException('Current and new password can not match', common_1.HttpStatus.BAD_REQUEST);
        }
        if (data.password === data.confirmationPassword) {
            if (user) {
                this.userRepository.update({ id: id }, { password: bcrypt.hashSync(data.password, 10) });
                return 'password updated';
            }
            else {
                throw new common_1.NotFoundException('user not found');
            }
        }
        else {
            throw new common_1.HttpException('Passwords do not match', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async update(id, updateUserDto) {
        const us = await this.userRepository.findOneBy({ id });
        if (us) {
            const { name, surname } = updateUserDto;
            this.userRepository.update({ id }, { name, surname });
            return "update user - " + us.name;
        }
        else {
            throw new common_1.NotFoundException('Oops! user not found');
        }
    }
    async forgotPassword(fPass) {
        const user = await this.userRepository.findOne({
            where: {
                email: fPass.email,
            }
        });
        if (user) {
            const code = Math.floor(Math.random() * 10000000);
            await this.userRepository.update({ id: user.id }, { code });
            try {
                await this.mailerService.sendMail({
                    to: "yurabaghdasaryan889@gmail.com ",
                    from: 'yurabaghdasaryan889@gmail.com',
                    subject: 'Resetting your account password',
                    html: `
          <h3 style='color:#0aa'>Hello ${user.name}</h3>\n
          You have requested to reset the password of your account.\n\n\n
          Here is the security code to change your password. 
          \n <h3 style='font-family:cursive'>${code}</h3>`
                });
            }
            catch (e) {
                console.log(e.message);
            }
            return 'forgotPassword - ' + user.email;
        }
        else {
            return new common_1.NotFoundException('user not found');
        }
    }
    async resetPassword(rPass, email) {
        const user = await this.userRepository.findOne({
            where: {
                email: email,
                code: rPass.code
            }
        });
        if (user) {
            if (rPass.password != rPass.confirm_password) {
                throw new common_1.BadRequestException('Passwords do not match.');
            }
            await this.userRepository.update({ id: user.id }, {
                password: bcrypt.hashSync(rPass.password, 10),
                code: null
            });
            return 'resetPassword - ' + user.email;
        }
        else {
            throw new common_1.BadRequestException('Invalid or expired reset code.');
        }
    }
    async remove(id) {
        const us = await this.userRepository.findOneBy({ id });
        if (us) {
            this.userRepository.delete({ id });
            return "delete user - " + us.name;
        }
        else {
            throw new common_1.NotFoundException('Oops! user not found');
        }
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        dist_1.MailerService,
        freelancer_service_1.FreelancerService,
        customer_service_1.CustomerService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map