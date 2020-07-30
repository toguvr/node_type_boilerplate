import { Repository, getRepository } from 'typeorm';

import IServiceRepository from '@modules/services/repositories/IServiceRepository';
import IServiceDTO from '@modules/services/dtos/IServiceDTO';
import Service from '../entities/Service';

interface SearchData {
  enterprise_id: string;
  day_week: string;
}

class ServiceRepository implements IServiceRepository {
  private ormRepository: Repository<Service>;

  constructor() {
    this.ormRepository = getRepository(Service);
  }

  public async findById(id: string): Promise<Service | undefined> {
    const enterprise = await this.ormRepository.findOne({ where: { id } });

    return enterprise;
  }

  public async findByDayWeekAndEnterpriseId(
    searchData: SearchData,
  ): Promise<Service[]> {
    const services = await this.ormRepository.find({
      where: {
        enterprise_id: searchData.enterprise_id,
        day_week: searchData.day_week,
      },
    });

    return services;
  }

  public async create(
    serviceDescriptionData: IServiceDTO[],
  ): Promise<Service[]> {
    const serviceDescription = this.ormRepository.create(
      serviceDescriptionData.map(data => ({ ...data })),
    );

    await this.ormRepository.save(serviceDescription);

    return serviceDescription;
  }

  public async save(serviceDescriptionData: Service[]): Promise<Service[]> {
    return this.ormRepository.save(serviceDescriptionData);
  }
}

export default ServiceRepository;
