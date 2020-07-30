import EnterprisesUsers from '../infra/typeorm/entities/EnterprisesUsers';
import ICreateEnterpriseInviteDTO from '../dtos/ICreateEnterpriseInviteDTO';

export default interface IEnterprisesUsersRepository {
  create(data: ICreateEnterpriseInviteDTO): Promise<EnterprisesUsers>;
  findById(id: string): Promise<EnterprisesUsers | undefined>;
  findByEnterpriseId(
    enterprise_id: string,
  ): Promise<EnterprisesUsers | undefined>;
  findByUserId(user_id: string): Promise<EnterprisesUsers | undefined>;
  findAllByUserId(user_id: string): Promise<EnterprisesUsers[]>;
  findByUserIdAndEnterpriseId(
    data: ICreateEnterpriseInviteDTO,
  ): Promise<EnterprisesUsers | undefined>;
  save(enterpriseInvite: EnterprisesUsers): Promise<EnterprisesUsers>;
}
