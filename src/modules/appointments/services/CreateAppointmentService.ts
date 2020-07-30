import {
  startOfHour,
  isBefore,
  getHours,
  format,
  getDate,
  getMonth,
  getYear,
  getMinutes,
  subHours,
  addHours,
} from 'date-fns';

import AppError from '@shared/errors/AppError';

import { inject, injectable } from 'tsyringe';
import INotificationsRepository from '@modules/notifications/repositories/INotificationRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IServiceRepository from '@modules/services/repositories/IServiceRepository';
import IPlansUserRepository from '@modules/plans/repositories/IPlansUserRepository';
import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
  service_id: string;
  user_id: string;
  date: Date;
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,

    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('ServiceRepository')
    private serviceRepository: IServiceRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,

    @inject('PlansUserRepository')
    private plansUserRepository: IPlansUserRepository,
  ) {}

  public async execute({
    service_id,
    user_id,
    date,
  }: IRequest): Promise<Appointment> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('this user doesnt exists');
    }

    const service = await this.serviceRepository.findById(service_id);

    if (!service) {
      throw new AppError('this service doesnt exists');
    }

    const formattedDateWithSubHoursToSchedule = addHours(
      new Date(),
      service.hour_to_schedule,
    );

    const [hour, minute] = service.start_hour.split(':');
    const formattedServiceDate = new Date(
      getYear(new Date()),
      getMonth(new Date()),
      getDate(new Date()),
      Number(hour),
      Number(minute),
    );

    if (isBefore(formattedServiceDate, new Date())) {
      throw new AppError("You can't create an appointment on a past date");
    }

    if (isBefore(formattedServiceDate, formattedDateWithSubHoursToSchedule)) {
      throw new AppError(
        `You can't do checkin if has left ${service.hour_to_schedule} to service`,
      );
    }

    const currentPlan = await this.plansUserRepository.findByActive(user_id);

    if (!currentPlan) {
      throw new AppError('User doesnt have an active plan.');
    }

    if (currentPlan) {
      if (isBefore(currentPlan.expiration_at, new Date())) {
        throw new AppError('User plan expired.');
      }
    }

    // const appointmentDate = startOfHour(date);

    // if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17) {
    //   throw new AppError('You canonly create appointments between 8am and 5pm');
    // }

    // const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
    //   appointmentDate,
    //   provider_id,
    // );

    // if (findAppointmentInSameDate) {
    //   throw new AppError('This appointment is already booked');
    // }

    const appointment = await this.appointmentsRepository.findByDate({
      date,
    });

    // const dateFormatted = format(appointmentDate, "dd/MM/yyyy 'às' HH:mm'h'");

    // await this.notificationsRepository.create({
    //   recipient_id: provider_id,
    //   content: `Novo agendamento para dia ${dateFormatted}`,
    // });

    // await this.cacheProvider.invalidate(
    //   `provider-appointments:${provider_id}:${format(
    //     appointmentDate,
    //     'yyyy-M-d',
    //   )}`,
    // );

    return appointment;
  }
}

export default CreateAppointmentService;
