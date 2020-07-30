import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import EnterprisesUsers from '../infra/typeorm/entities/EnterprisesUsers';
import IEnterprisesUsersRepository from '../repositories/IEnterprisesUsersRepository';
import IEnterprisesRepository from '../repositories/IEnterprisesRepository';

interface IRequest {
  user_id: string;
  enterprise_id: string;
}

interface IRequestInvite {
  invite_id: string;
  user_id: string;
}

@injectable()
class CreateEnterpriseService {
  constructor(
    @inject('EnterprisesUsersRepository')
    private enterprisesUsersRepository: IEnterprisesUsersRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('EnterprisesRepository')
    private enterprisesRepository: IEnterprisesRepository,
  ) {}

  public async search({
    enterprise_id,
    user_id,
  }: IRequest): Promise<EnterprisesUsers> {
    const invite = await this.enterprisesUsersRepository.findByUserIdAndEnterpriseId(
      {
        user_id,
        enterprise_id,
      },
    );

    if (!invite) {
      throw new AppError(
        'Invite with this user and this enterprise not exists.',
      );
    }

    return invite;
  }

  public async searchAllUserInvites(
    user_id: string,
  ): Promise<EnterprisesUsers[]> {
    const invites = await this.enterprisesUsersRepository.findAllByUserId(
      user_id,
    );

    return invites;
  }

  public async accept({
    invite_id,
    user_id,
  }: IRequestInvite): Promise<EnterprisesUsers> {
    const invite = await this.enterprisesUsersRepository.findById(invite_id);

    if (!invite) {
      throw new AppError(
        'Invite with this user and this enterprise not exists.',
      );
    }

    const enterprise = await this.enterprisesRepository.findById(
      invite.enterprise_id,
    );

    if (user_id !== invite?.user_id && user_id !== enterprise?.owner_id) {
      throw new AppError('You are not a member of this invite.');
    }

    invite.accepted = 1;

    this.enterprisesUsersRepository.save(invite);

    return invite;
  }

  public async execute({
    enterprise_id,
    user_id,
  }: IRequest): Promise<EnterprisesUsers> {
    const invite = await this.enterprisesUsersRepository.findByUserIdAndEnterpriseId(
      {
        user_id,
        enterprise_id,
      },
    );

    if (invite) {
      throw new AppError(
        'An invite with this user and this enterprise already exists.',
      );
    }
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('This user not exists.');
    }
    const enterprise = await this.enterprisesRepository.findById(enterprise_id);

    if (!enterprise) {
      throw new AppError('This enterprise not exists.');
    }

    const enterpriseInvite = await this.enterprisesUsersRepository.create({
      enterprise_id,
      user_id,
    });

    return enterpriseInvite;
  }
}

export default CreateEnterpriseService;
