import { inject, injectable } from 'tsyringe';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import User from '@modules/users/infra/typeorm/entities/User';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import { classToClass } from 'class-transformer';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import Appointments from '../infra/typeorm/entities/Appointment';

@injectable()
class ListProviderService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(user_id: string): Promise<Appointments[]> {
    // let users = await this.cacheProvider.recover<Appointments[]>(
    //   `providers-list:${user_id}`,
    // );
    // if (!users) {
    const appointments = await this.appointmentsRepository.findAllInDayFromUser(
      user_id,
    );

    // await this.cacheProvider.save(
    //   `providers-list:${user_id}`,
    //   classToClass(users),
    // );
    // }

    return appointments;
  }
}
export default ListProviderService;
