import { format } from 'date-fns';

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
    @inject('EnteprisesRepository')
    private enteprisesRepository: IEnterprisesRepository,
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
    const enterprise = await this.enteprisesRepository.create({
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
