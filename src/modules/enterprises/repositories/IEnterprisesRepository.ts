import Enterprise from '../infra/typeorm/entities/Enterprises';
import ICreateEnterpriseDTO from '../dtos/ICreateEnterpriseDTO';

export default interface IEnterprisesRepository {
  create(data: ICreateEnterpriseDTO): Promise<Enterprise>;
  findById(id: string): Promise<Enterprise | undefined>;
  findByOwnerId(owner_id: string): Promise<Enterprise | undefined>;
  findByEnterpriseName(name: string): Promise<Enterprise[] | undefined>;
  save(enterprise: Enterprise): Promise<Enterprise>;
}
