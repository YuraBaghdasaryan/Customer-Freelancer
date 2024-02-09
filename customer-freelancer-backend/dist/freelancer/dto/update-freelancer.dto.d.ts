import { CreateFreelancerDto } from './create-freelancer.dto';
declare const UpdateFreelancerDto_base: import("@nestjs/common").Type<Partial<CreateFreelancerDto>>;
export declare class UpdateFreelancerDto extends UpdateFreelancerDto_base {
    salary: number;
    profession: string;
}
export {};
