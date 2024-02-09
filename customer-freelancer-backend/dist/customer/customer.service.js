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
exports.CustomerService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const customer_entity_1 = require("./entities/customer.entity");
const user_entity_1 = require("../user/entities/user.entity");
let CustomerService = class CustomerService {
    constructor(customerRepository, userRepository) {
        this.customerRepository = customerRepository;
        this.userRepository = userRepository;
    }
    async create(createCustomerDto) {
        await this.customerRepository.save(createCustomerDto);
        return 'adds a new customer';
    }
    async findAll() {
        return this.customerRepository.find({
            relations: {
                user: true
            }
        });
    }
    async findOne(id) {
        const us = await this.userRepository.findOne({
            where: {
                id
            },
            relations: {
                customer: true
            }
        });
        if (us) {
            return await this.customerRepository.findOne({
                where: {
                    id: us.customer[0].id
                },
                relations: {
                    user: true,
                    jobs: true
                }
            });
        }
        else {
            throw new common_1.NotFoundException("user not found");
        }
    }
    async update(id, updateCustomerDto) {
        const us = await this.customerRepository.findOneBy({ id });
        if (us) {
            this.customerRepository.update({ id }, updateCustomerDto);
            return "delete customer - " + us.id;
        }
        else {
            throw new common_1.NotFoundException('Oops! customer not found');
        }
    }
};
CustomerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(customer_entity_1.Customer)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], CustomerService);
exports.CustomerService = CustomerService;
//# sourceMappingURL=customer.service.js.map