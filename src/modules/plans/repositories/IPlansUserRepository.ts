import PlansUsers from '../infra/typeorm/entities/PlansUsers';
import ICreatePlansUserDTO from '../dtos/ICreatePlansUserDTO';

export default interface IPlansUserRepository {
  create(data: ICreatePlansUserDTO): Promise<PlansUsers>;
  findById(id: string): Promise<PlansUsers | undefined>;
  findByActive(
    recipient_id: string,
    enterprise_id: string,
  ): Promise<PlansUsers | undefined>;
  findAllByUserId(user_id: string): Promise<PlansUsers[]>;
  findAllByEnterpriseId(enterprise_id: string): Promise<PlansUsers[]>;
  findAllEnterpriseUserPlansByOwnerId(
    owner_id: string,
  ): Promise<PlansUsers[] | undefined>;
  save(plan: PlansUsers): Promise<PlansUsers>;
}
