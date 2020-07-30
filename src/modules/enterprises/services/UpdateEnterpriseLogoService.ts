import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Enterprises from '@modules/enterprises/infra/typeorm/entities/Enterprises';

import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import IEnterprisesRepository from '../repositories/IEnterprisesRepository';

interface IRequest {
  user_id: string;
  avatarFilename: string;
}

@injectable()
class UpdateEnterpriseLogoService {
  constructor(
    @inject('EnterprisesRepository')
    private enterprisesRepository: IEnterprisesRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    user_id,
    avatarFilename,
  }: IRequest): Promise<Enterprises> {
    const enterprise = await this.enterprisesRepository.findByOwnerId(user_id);

    if (!enterprise) {
      throw new AppError('You are not the owner of this enterprise.', 401);
    }

    if (enterprise.logo) {
      // Deletar avatar anterior se já tinha

      await this.storageProvider.deleteFile(enterprise.logo);
    }

    const filename = await this.storageProvider.saveFile(avatarFilename);

    enterprise.logo = filename;

    await this.enterprisesRepository.save(enterprise);

    return enterprise;
  }
}
export default UpdateEnterpriseLogoService;
