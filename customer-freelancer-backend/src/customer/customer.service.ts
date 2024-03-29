import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './entities/customer.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer) private customerRepository: Repository<Customer>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) { }

  async create(createCustomerDto: CreateCustomerDto) {
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

  async findOne(id: number) {
    const us = await this.userRepository.findOne({
      where:{
        id
      },
      relations:{
        customer:true
      }
    })
    if(us){

    return await this.customerRepository.findOne({
      where: {
        id:us.customer[0].id
      },
      relations: {
        user: true,
        jobs:true
      }
    })
  }else{
    throw new NotFoundException("user not found")
  }

  }

  // async remove(id: number) {
  //   const us = await this.customerRepository.findOneBy({ id });
  //   if (us) {
  //     this.customerRepository.delete({ id })
  //     return "delete customer - " + us.id;
  //   } else {
  //     throw new NotFoundException('Oops! customer not found');
  //   }
  // }
  async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    const us = await this.customerRepository.findOneBy({ id });
    if (us) {
      this.customerRepository.update({ id }, updateCustomerDto)
      return "delete customer - " + us.id;
    } else {
      throw new NotFoundException('Oops! customer not found');
    }
  }
}
