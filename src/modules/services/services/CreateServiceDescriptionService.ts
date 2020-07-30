import AppError from '@shared/errors/AppError';

import { inject, injectable } from 'tsyringe';
import IEnterprisesRepository from '@modules/enterprises/repositories/IEnterprisesRepository';
import ServiceDescription from '../infra/typeorm/entities/ServiceDescription';
import IServiceDescriptionRepository from '../repositories/IServiceDescriptionRepository';

interface IRequest {
  title: string;
  description: string;
  user_id: string;
}

@injectable()
class CreateServiceDescriptionService {
  constructor(
    @inject('EnterprisesRepository')
    private enterprisesRepository: IEnterprisesRepository,

    @inject('ServiceDescriptionRepository')
    private serviceDescriptionRepository: IServiceDescriptionRepository,
  ) {}

  public async showAll(user_id: string): Promise<ServiceDescription[]> {
    const enterprise = await this.enterprisesRepository.findByOwnerId(user_id);

    if (!enterprise) {
      throw new AppError('You are not owner of an enterprise');
    }

    const serviceDescription = await this.serviceDescriptionRepository.findByEnterpriseId(
      enterprise.id,
    );
    return serviceDescription;
  }

  public async execute({
    title,
    description,
    user_id,
  }: IRequest): Promise<ServiceDescription> {
    const enterprise = await this.enterprisesRepository.findByOwnerId(user_id);

    if (!enterprise) {
      throw new AppError('You are not owner of an enterprise');
    }

    const serviceDescription = await this.serviceDescriptionRepository.create({
      title,
      description,
      enterprise_id: enterprise.id,
    });
    return serviceDescription;
  }
}

export default CreateServiceDescriptionService;
