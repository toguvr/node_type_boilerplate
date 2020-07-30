import AppError from '@shared/errors/AppError';

import { inject, injectable } from 'tsyringe';
import Enterprises from '../infra/typeorm/entities/Enterprises';
import IEnterprisesRepository from '../repositories/IEnterprisesRepository';

interface IRequest {
  name: string;
  area: string;
  address: string;
  open_hour: string;
  close_hour: string;
  primary_color: string;
  secondary_color: string;
  isPrivate: boolean;
  owner_id: string;
}

@injectable()
class CreateEnterpriseService {
  constructor(
    @inject('EnterprisesRepository')
    private enterprisesRepository: IEnterprisesRepository,
  ) {}

  public async execute({
    name,
    area,
    address,
    open_hour,
    close_hour,
    primary_color,
    secondary_color,
    isPrivate,
    owner_id,
  }: IRequest): Promise<Enterprises> {
    const hasOwner = await this.enterprisesRepository.findByOwnerId(owner_id);

    if (hasOwner) {
      throw new AppError('You already owns a company.');
    }

    const enterprise = await this.enterprisesRepository.create({
      name,
      area,
      address,
      open_hour,
      close_hour,
      primary_color,
      secondary_color,
      isPrivate,
      owner_id,
    });
    return enterprise;
  }
}

export default CreateEnterpriseService;
