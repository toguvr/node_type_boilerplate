import { Repository, getRepository, Like } from 'typeorm';

import IEnterprisesUsersRepository from '@modules/enterprises/repositories/IEnterprisesUsersRepository';
import ICreateEnterpriseInviteDTO from '@modules/enterprises/dtos/ICreateEnterpriseInviteDTO';
import EnterprisesUsers from '../entities/EnterprisesUsers';

class EnterprisesUsersRepository implements IEnterprisesUsersRepository {
  private ormRepository: Repository<EnterprisesUsers>;

  constructor() {
    this.ormRepository = getRepository(EnterprisesUsers);
  }

  public async findById(id: string): Promise<EnterprisesUsers | undefined> {
    const enterprise = await this.ormRepository.findOne(id);

    return enterprise;
  }

  public async findByEnterpriseId(
    enterprise_id: string,
  ): Promise<EnterprisesUsers | undefined> {
    const enterprise = await this.ormRepository.findOne({
      where: { enterprise_id },
    });

    return enterprise;
  }

  public async findByUserIdAndEnterpriseId({
    enterprise_id,
    user_id,
  }: ICreateEnterpriseInviteDTO): Promise<EnterprisesUsers | undefined> {
    const enterprise = await this.ormRepository.findOne({
      relations: ['enterprise', 'user'],
      where: { enterprise_id, user_id },
    });

    return enterprise;
  }

  public async findByUserId(
    user_id: string,
  ): Promise<EnterprisesUsers | undefined> {
    const enterprise = await this.ormRepository.findOne({
      where: { user_id },
    });

    return enterprise;
  }

  public async findAllByUserId(user_id: string): Promise<EnterprisesUsers[]> {
    const enterprise = await this.ormRepository.find({
      where: { user_id },
    });

    return enterprise;
  }

  public async create(
    enterpriseData: ICreateEnterpriseInviteDTO,
  ): Promise<EnterprisesUsers> {
    const enterpriseInvite = this.ormRepository.create(enterpriseData);

    await this.ormRepository.save(enterpriseInvite);

    return enterpriseInvite;
  }

  public async save(
    enterpriseInvite: EnterprisesUsers,
  ): Promise<EnterprisesUsers> {
    return this.ormRepository.save(enterpriseInvite);
  }
}

export default EnterprisesUsersRepository;
