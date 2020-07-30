import ServiceDescription from '../infra/typeorm/entities/ServiceDescription';
import IServiceDescriptionDTO from '../dtos/IServiceDescriptionDTO';

export default interface IServiceDescriptionRepository {
  create(data: IServiceDescriptionDTO): Promise<ServiceDescription>;
  findById(id: string): Promise<ServiceDescription | undefined>;
  findByEnterpriseId(enterprise_id: string): Promise<ServiceDescription[]>;
  save(serviceDescription: ServiceDescription): Promise<ServiceDescription>;
}
