import AppError from '@shared/errors/AppError';

import { inject, injectable } from 'tsyringe';
import IEnterprisesRepository from '@modules/enterprises/repositories/IEnterprisesRepository';

import { addDays, format } from 'date-fns';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IPlansRepository from '../repositories/IPlansRepository';
import IPlansUserRepository from '../repositories/IPlansUserRepository';
import PlansUsers from '../infra/typeorm/entities/PlansUsers';

interface IRequest {
  recipient_id: string;
  plan_id: string;
  user_id: string;
}

@injectable()
class CreatePlansUsersService {
  constructor(
    @inject('PlansRepository')
    private plansRepository: IPlansRepository,

    @inject('EnterprisesRepository')
    private enterprisesRepository: IEnterprisesRepository,

    @inject('PlansUserRepository')
    private plansUserRepository: IPlansUserRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async showAllFromEnterprise(user_id: string): Promise<PlansUsers[]> {
    const enterprise = await this.enterprisesRepository.findByOwnerId(user_id);

    if (!enterprise) {
      throw new AppError('You are not a owner of an enterprise.');
    }

    const allEnterprisesPlans = await this.plansUserRepository.findAllByEnterpriseId(
      enterprise.id,
    );

    return allEnterprisesPlans;
  }

  public async showAllFromUser(user_id: string): Promise<PlansUsers[]> {
    const user = this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User doesnt exist.');
    }

    const allUserPlans = await this.plansUserRepository.findAllByUserId(
      user_id,
    );

    return allUserPlans;
  }

  public async cancel(active_plan_id: string): Promise<PlansUsers> {
    const activePlan = await this.plansUserRepository.findById(active_plan_id);

    if (!activePlan) {
      throw new AppError('Dont have an plan with this id.');
    }

    if (!activePlan.active) {
      throw new AppError('This plan isnt active.');
    }

    activePlan.active = 0;
    activePlan.canceled_at = new Date();

    const userPlans = await this.plansUserRepository.save(activePlan);

    return userPlans;
  }

  public async execute({
    recipient_id,
    plan_id,
    user_id,
  }: IRequest): Promise<PlansUsers> {
    const user = await this.usersRepository.findById(recipient_id);

    if (!user) {
      throw new AppError('This user dont have an account.');
    }

    const enterprise = await this.enterprisesRepository.findByOwnerId(user_id);

    if (!enterprise) {
      throw new AppError('You are not a owner of an enterprise.');
    }

    const plan = await this.plansRepository.findById(plan_id);

    if (!plan) {
      throw new AppError('Plan does not exists.');
    }

    const oldPlan = await this.plansUserRepository.findByActive(
      recipient_id,
      enterprise.id,
    );

    if (oldPlan) {
      throw new AppError('User has an active plan in this enterprise.');
    }

    const expirationDate = addDays(new Date(), Number(plan.days_to_expire));

    const activeNewPlan = await this.plansUserRepository.create({
      user_id: recipient_id,
      enterprise_id: enterprise.id,
      plan_id,
      expiration_at: expirationDate,
    });

    return activeNewPlan;
  }
}

export default CreatePlansUsersService;
