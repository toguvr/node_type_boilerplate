import { Repository, getRepository } from 'typeorm';

import IPlansRepository from '@modules/plans/repositories/IPlansRepository';
import ICreatePlanDTO from '@modules/plans/dtos/ICreatePlanDTO';
import Plan from '../entities/Plan';

class PlansRepository implements IPlansRepository {
  private ormRepository: Repository<Plan>;

  constructor() {
    this.ormRepository = getRepository(Plan);
  }

  public async findById(id: string): Promise<Plan | undefined> {
    const plan = await this.ormRepository.findOne(id);

    return plan;
  }

  public async findAllEnterprisePlansByUserId(
    enterprise_id: string,
  ): Promise<Plan[] | undefined> {
    const plan = await this.ormRepository.find({
      where: { enterprise_id },
    });

    return plan;
  }

  public async create(planData: ICreatePlanDTO): Promise<Plan> {
    const plan = this.ormRepository.create(planData);

    await this.ormRepository.save(plan);

    return plan;
  }

  public async save(plan: Plan): Promise<Plan> {
    return this.ormRepository.save(plan);
  }
}

export default PlansRepository;
