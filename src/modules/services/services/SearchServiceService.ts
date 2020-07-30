import AppError from '@shared/errors/AppError';

import { inject, injectable } from 'tsyringe';
import IEnterprisesRepository from '@modules/enterprises/repositories/IEnterprisesRepository';
import Service from '../infra/typeorm/entities/Service';
import IServiceRepository from '../repositories/IServiceRepository';

interface IRequest {
  enterprise_id: string;
  day_week: string;
}

@injectable()
class SearchServiceService {
  constructor(
    @inject('EnterprisesRepository')
    private enterprisesRepository: IEnterprisesRepository,

    @inject('ServiceRepository')
    private serviceRepository: IServiceRepository,
  ) {}

  public async execute({
    enterprise_id,
    day_week,
  }: IRequest): Promise<Service[]> {
    const enterprise = await this.enterprisesRepository.findById(enterprise_id);

    if (!enterprise) {
      throw new AppError('This enterprise doesnt exists');
    }

    const serviceDescription = await this.serviceRepository.findByDayWeekAndEnterpriseId(
      {
        enterprise_id,
        day_week,
      },
    );

    return serviceDescription;
  }
}

export default SearchServiceService;
