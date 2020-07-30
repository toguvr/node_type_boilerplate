import {
  Repository,
  getRepository,
  Raw,
  Between,
  MoreThanOrEqual,
} from 'typeorm';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IFindAllInMonthFromProviderDTO from '@modules/appointments/dtos/IFindAllInMonthFromProviderDTO';
import IFindAllUserAppoinrmentFromEnterpriseDTO from '@modules/appointments/dtos/IFindAllUserAppoinrmentFromEnterpriseDTO';
import Appointment from '../entities/Appointment';

class AppointmentsRepository implements IAppointmentsRepository {
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  public async findByDate(
    date: Date,
    provider_id: string,
  ): Promise<Appointment | undefined> {
    const findAppointment = await this.ormRepository.findOne({
      where: { date, provider_id },
    });

    return findAppointment;
  }

  public async findAllInMonthFromProvider({
    provider_id,
    month,
    year,
  }: IFindAllInMonthFromProviderDTO): Promise<Appointment[]> {
    const parsedMonth = String(month).padStart(2, '0');
    const appointments = this.ormRepository.find({
      where: {
        provider_id,
        date: Raw(
          dateFieldName =>
            `to_char(${dateFieldName},'MM-YYYY') = '${parsedMonth}-${year}'`,
        ),
      },
    });

    return appointments;
  }

  public async searchAllAppointmentsFromUserBetweenDate({
    createAt,
    expirationAt,
    user_id,
    enterprise_id,
  }: IFindAllUserAppoinrmentFromEnterpriseDTO): Promise<Appointment[]> {
    const appointments = this.ormRepository.find({
      where: {
        user_id,
        enterprise_id,
        date: Between(createAt, expirationAt),
      },
    });

    return appointments;
  }

  public async findAllFromUser(user_id: string): Promise<Appointment[]> {
    const appointments = this.ormRepository.find({
      where: {
        user_id,
      },
      relations: ['user', 'service'],
    });

    return appointments;
  }

  public async findAllFromUserInThisEnterprise(
    user_id: string,
    enterprise_id: string,
  ): Promise<Appointment[]> {
    const appointments = this.ormRepository.find({
      where: {
        user_id,
        enterprise_id,
      },
      relations: ['user', 'service'],
    });

    return appointments;
  }

  public async findByServiceAndUserId(
    user_id: string,
    service_id: string,
  ): Promise<Appointment | undefined> {
    const appointments = this.ormRepository.findOne({
      where: {
        user_id,
        service_id,
        date: MoreThanOrEqual(new Date()),
      },
      relations: ['user', 'service'],
    });

    return appointments;
  }

  public async usersInService(service_id: string): Promise<number> {
    const numberOfAppointment = this.ormRepository.count({
      where: {
        service_id,
      },
      relations: ['user', 'service'],
    });

    return numberOfAppointment;
  }

  public async create({
    service_id,
    user_id,
    enterprise_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({
      service_id,
      user_id,
      enterprise_id,
      date,
    });

    await this.ormRepository.save(appointment);

    return appointment;
  }
}

export default AppointmentsRepository;
