import AppError from '@shared/errors/AppError';

import { inject, injectable } from 'tsyringe';
import IEnterprisesRepository from '@modules/enterprises/repositories/IEnterprisesRepository';
import ServiceCategory from '../infra/typeorm/entities/ServiceCategory';
import IServiceCategoryRepository from '../repositories/IServiceCategoryRepository';

interface IRequest {
  name: string;
  user_id: string;
}

@injectable()
class CreateServiceDescriptionService {
  constructor(
    @inject('EnterprisesRepository')
    private enterprisesRepository: IEnterprisesRepository,

    @inject('ServiceCategoryRepository')
    private serviceCategoryRepository: IServiceCategoryRepository,
  ) {}

  public async showAll(enterprise_id: string): Promise<ServiceCategory[]> {
    const serviceCategories = await this.serviceCategoryRepository.findByEnterpriseId(
      enterprise_id,
    );

    return serviceCategories;
  }

  public async execute({ name, user_id }: IRequest): Promise<ServiceCategory> {
    const enterprise = await this.enterprisesRepository.findByOwnerId(user_id);

    if (!enterprise) {
      throw new AppError('You are not owner of an enterprise');
    }

    const serviceDescription = await this.serviceCategoryRepository.create({
      name,
      enterprise_id: enterprise.id,
    });
    return serviceDescription;
  }
}

export default CreateServiceDescriptionService;
