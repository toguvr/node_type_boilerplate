import { Repository, getRepository, Not, Like } from 'typeorm';

import IEnterprisesRepository from '@modules/enterprises/repositories/IEnterprisesRepository';
import ICreateEnterpriseDTO from '@modules/enterprises/dtos/ICreateEnterpriseDTO';
import Enterprises from '../entities/Enterprises';

class EnterprisesRepository implements IEnterprisesRepository {
  private ormRepository: Repository<Enterprises>;

  constructor() {
    this.ormRepository = getRepository(Enterprises);
  }

  public async findById(id: string): Promise<Enterprises | undefined> {
    const enterprise = await this.ormRepository.findOne(id);

    return enterprise;
  }

  public async findByOwnerId(
    owner_id: string,
  ): Promise<Enterprises | undefined> {
    const enterprise = await this.ormRepository.findOne({
      where: { owner_id },
    });

    return enterprise;
  }

  public async findByEnterpriseName(
    name: string,
  ): Promise<Enterprises[] | undefined> {
    const enterprise = await this.ormRepository.find({
      name: Like(`%${name}%`),
    });

    return enterprise;
  }

  public async create(
    enterpriseData: ICreateEnterpriseDTO,
  ): Promise<Enterprises> {
    const enterprise = this.ormRepository.create(enterpriseData);

    await this.ormRepository.save(enterprise);

    return enterprise;
  }

  public async save(enterprise: Enterprises): Promise<Enterprises> {
    return this.ormRepository.save(enterprise);
  }
}

export default EnterprisesRepository;
