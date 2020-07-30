import { Repository, getRepository } from 'typeorm';

import IPlansUserRepository from '@modules/plans/repositories/IPlansUserRepository';
import ICreatePlansUserDTO from '@modules/plans/dtos/ICreatePlansUserDTO';
import PlansUsers from '../entities/PlansUsers';

class PlansUserRepository implements IPlansUserRepository {
  private ormRepository: Repository<PlansUsers>;

  constructor() {
    this.ormRepository = getRepository(PlansUsers);
  }

  public async findById(id: string): Promise<PlansUsers | undefined> {
    const plan = await this.ormRepository.findOne(id);

    return plan;
  }

  public async findByActive(
    recipient_id: string,
    enterprise_id: string,
  ): Promise<PlansUsers | undefined> {
    const plan = await this.ormRepository.findOne({
      where: { active: 1, user_id: recipient_id, enterprise_id },
    });

    return plan;
  }

  public async findAllEnterpriseUserPlansByOwnerId(
    enterprise_id: string,
  ): Promise<PlansUsers[] | undefined> {
    const plan = await this.ormRepository.find({
      where: { enterprise_id },
    });

    return plan;
  }

  public async findAllByUserId(user_id: string): Promise<PlansUsers[]> {
    const plan = await this.ormRepository.find({
      relations: ['enterprise', 'plan'],
      where: { user_id },
    });

    return plan;
  }

  public async findAllByEnterpriseId(
    enterprise_id: string,
  ): Promise<PlansUsers[]> {
    const plan = await this.ormRepository.find({
      relations: ['user', 'plan'],
      where: { enterprise_id },
    });

    return plan;
  }

  public async create(planData: ICreatePlansUserDTO): Promise<PlansUsers> {
    const plan = this.ormRepository.create(planData);

    await this.ormRepository.save(plan);

    return plan;
  }

  public async save(plan: PlansUsers): Promise<PlansUsers> {
    return this.ormRepository.save(plan);
  }
}

export default PlansUserRepository;
