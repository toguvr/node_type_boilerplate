import { Repository, getRepository } from 'typeorm';

import IServiceCategoryRepository from '@modules/services/repositories/IServiceCategoryRepository';
import IServiceCategoryDTO from '@modules/services/dtos/IServiceCategoryDTO';
import ServiceCategory from '../entities/ServiceCategory';

class ServiceCategoryRepository implements IServiceCategoryRepository {
  private ormRepository: Repository<ServiceCategory>;

  constructor() {
    this.ormRepository = getRepository(ServiceCategory);
  }

  public async findById(id: string): Promise<ServiceCategory | undefined> {
    const enterprise = await this.ormRepository.findOne(id);

    return enterprise;
  }

  public async findByEnterpriseId(
    enterprise_id: string,
  ): Promise<ServiceCategory[]> {
    const enterprise = await this.ormRepository.find({
      where: { enterprise_id },
    });

    return enterprise;
  }

  public async create(
    serviceDescriptionData: IServiceCategoryDTO,
  ): Promise<ServiceCategory> {
    const serviceDescription = this.ormRepository.create(
      serviceDescriptionData,
    );

    await this.ormRepository.save(serviceDescription);

    return serviceDescription;
  }

  public async save(
    serviceDescriptionData: ServiceCategory,
  ): Promise<ServiceCategory> {
    return this.ormRepository.save(serviceDescriptionData);
  }
}

export default ServiceCategoryRepository;
