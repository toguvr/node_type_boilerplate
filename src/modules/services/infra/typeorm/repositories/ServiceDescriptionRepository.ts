import { Repository, getRepository } from 'typeorm';

import IServiceDescriptionRepository from '@modules/services/repositories/IServiceDescriptionRepository';
import IServiceDescriptionDTO from '@modules/services/dtos/IServiceDescriptionDTO';
import ServiceDescription from '../entities/ServiceDescription';

class ServiceDescriptionRepository implements IServiceDescriptionRepository {
  private ormRepository: Repository<ServiceDescription>;

  constructor() {
    this.ormRepository = getRepository(ServiceDescription);
  }

  public async findById(id: string): Promise<ServiceDescription | undefined> {
    const enterprise = await this.ormRepository.findOne(id);

    return enterprise;
  }

  public async findByEnterpriseId(
    enterprise_id: string,
  ): Promise<ServiceDescription[]> {
    const enterprise = await this.ormRepository.find({
      where: { enterprise_id },
    });

    return enterprise;
  }

  public async create(
    serviceDescriptionData: IServiceDescriptionDTO,
  ): Promise<ServiceDescription> {
    const serviceDescription = this.ormRepository.create(
      serviceDescriptionData,
    );

    await this.ormRepository.save(serviceDescription);

    return serviceDescription;
  }

  public async save(
    serviceDescriptionData: ServiceDescription,
  ): Promise<ServiceDescription> {
    return this.ormRepository.save(serviceDescriptionData);
  }
}

export default ServiceDescriptionRepository;
