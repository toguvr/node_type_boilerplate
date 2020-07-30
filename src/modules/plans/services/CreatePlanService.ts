import AppError from '@shared/errors/AppError';

import { inject, injectable } from 'tsyringe';
import IEnterprisesRepository from '@modules/enterprises/repositories/IEnterprisesRepository';

import IPlansRepository from '../repositories/IPlansRepository';
import Plans from '../infra/typeorm/entities/Plan';

interface IRequest {
  name: string;
  price: number;
  schedule_limit: number;
  days_to_expire: number;
  user_id: string;
}

@injectable()
class CreatePlanService {
  constructor(
    @inject('PlansRepository')
    private plansRepository: IPlansRepository,

    @inject('EnterprisesRepository')
    private enterprisesRepository: IEnterprisesRepository,
  ) {}

  public async showAll(user_id: string): Promise<Plans[] | undefined> {
    const enterprise = await this.enterprisesRepository.findByOwnerId(user_id);

    if (!enterprise) {
      throw new AppError('You are not a owner of an enterprise.');
    }

    const plans = await this.plansRepository.findAllEnterprisePlansByUserId(
      enterprise.id,
    );

    return plans;
  }

  public async execute({
    name,
    price,
    schedule_limit,
    days_to_expire,
    user_id,
  }: IRequest): Promise<Plans> {
    const enterprise = await this.enterprisesRepository.findByOwnerId(user_id);

    if (!enterprise) {
      throw new AppError('You are not a owner of an enterprise.');
    }

    const plan = await this.plansRepository.create({
      name,
      enterprise_id: enterprise.id,
      price,
      schedule_limit,
      days_to_expire,
    });
    return plan;
  }
}

export default CreatePlanService;
