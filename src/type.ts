export type User = {
  id: number;
  name: string;
  surname: string;
  email: string;
  password: string;
  emailToken: string;
  isVerified: number;
  code: number;
  role: number;
  freelancer: Freelacer;
};
export type RegisterUser = {
  name: string;
  surname: string;
  email: string;
  password: string;
  role: number;
  salary: number;
  description: string;
  profession: string;
};
export type loginUser = {
  username: string;
  password: string;
};
export type Skills = {
  id: number;
  name: any;
};

export type Freelacer = {
  id: number;
  userId: number;
  salary: number;
  user: User;
  profession: string;
  avg: number;
  jobs: Jobs[];
};

export type Jobs = {
  id: number;
  title: string;
  description: string;
  price: number;
  customerId: number;
  freelancerId: number;
  status: number;
  rate: number;
  text: string;
  freelancer: Freelacer;
};

export type Customer = {
  id: number;
  userId: number;
  description: string;
  user: User;
  jobs: Jobs[];
  customer: Customer[];
};
export type JobFreelancer = {
  job: Jobs;
  freelancerId: number;
  id: number;
  jobId: number;
  freelancer: Freelacer;
};
