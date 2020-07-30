import AppError from '@shared/errors/AppError';

import { inject, injectable } from 'tsyringe';
import IEnterprisesRepository from '@modules/enterprises/repositories/IEnterprisesRepository';
import Service from '../infra/typeorm/entities/Service';
import IServiceRepository from '../repositories/IServiceRepository';

interface IService {
  start_hour: string;
  description_id: string;
  category_id: string;
  capacity: number;
  day_week: number;
  pending_scheduling?: number;
  hour_to_schedule: number;
  user_name?: string;
  enterprise_id: string;
}

interface IRequest {
  dataArray: IService[];
  user_id: string;
}

@injectable()
class CreateServiceDescriptionService {
  constructor(
    @inject('EnterprisesRepository')
    private enterprisesRepository: IEnterprisesRepository,

    @inject('ServiceRepository')
    private serviceRepository: IServiceRepository,
  ) {}

  public async execute({ dataArray, user_id }: IRequest): Promise<Service[]> {
    const enterprise = await this.enterprisesRepository.findByOwnerId(user_id);

    if (!enterprise) {
      throw new AppError('You are not owner of an enterprise');
    }

    const dataArrayWithEnterpriseId = dataArray.map(data => ({
      ...data,
      enterprise_id: enterprise.id,
    }));

    const serviceDescription = await this.serviceRepository.create(
      dataArrayWithEnterpriseId,
    );

    return serviceDescription;
  }
}

export default CreateServiceDescriptionService;
