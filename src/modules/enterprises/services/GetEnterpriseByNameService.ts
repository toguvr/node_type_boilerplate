import { inject, injectable } from 'tsyringe';
import Enterprises from '../infra/typeorm/entities/Enterprises';
import IEnterprisesRepository from '../repositories/IEnterprisesRepository';

interface IRequest {
  name: string;
}

@injectable()
class CreateEnterpriseService {
  constructor(
    @inject('EnterprisesRepository')
    private enterprisesRepository: IEnterprisesRepository,
  ) {}

  public async execute({ name }: IRequest): Promise<Enterprises[] | undefined> {
    const enterprise = await this.enterprisesRepository.findByEnterpriseName(
      name,
    );

    return enterprise;
  }
}

export default CreateEnterpriseService;
