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
  isAfter,
} from 'date-fns';

import AppError from '@shared/errors/AppError';

import { inject, injectable } from 'tsyringe';
import INotificationsRepository from '@modules/notifications/repositories/INotificationRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IServiceRepository from '@modules/services/repositories/IServiceRepository';
import IPlansUserRepository from '@modules/plans/repositories/IPlansUserRepository';
import IEnterprisesRepository from '@modules/enterprises/repositories/IEnterprisesRepository';
import IPlansRepository from '@modules/plans/repositories/IPlansRepository';
import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
  service_id: string;
  user_id: string;
  enterprise_id: string;
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

    @inject('PlansRepository')
    private plansRepository: IPlansRepository,

    @inject('ServiceRepository')
    private serviceRepository: IServiceRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,

    @inject('PlansUserRepository')
    private plansUserRepository: IPlansUserRepository,

    @inject('EnterprisesRepository')
    private enterprisesRepository: IEnterprisesRepository,
  ) {}

  public async execute({
    service_id,
    user_id,
    enterprise_id,
  }: IRequest): Promise<Appointment> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('this user doesnt exists');
    }

    const service = await this.serviceRepository.findById(service_id);

    if (!service) {
      throw new AppError('this service doesnt exists');
    }

    const enterprise = await this.enterprisesRepository.findById(enterprise_id);

    if (!enterprise) {
      throw new AppError('this enterprise doesnt exists');
    }

    if (enterprise_id !== service.enterprise_id) {
      throw new AppError('this service isnt from this enterprise');
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
      Number(hour) || 0,
      Number(minute) || 0,
    );

    if (!Number(hour) && !Number(minute)) {
      throw new AppError(
        "Wrong format of hour and minute, fix the title to same as example '09:00'",
      );
    }

    if (isBefore(formattedServiceDate, new Date())) {
      throw new AppError("You can't create an appointment on a past date");
    }

    if (isBefore(formattedServiceDate, formattedDateWithSubHoursToSchedule)) {
      throw new AppError(
        `You can't do checkin if has left ${service.hour_to_schedule} to service`,
      );
    }

    const currentPlan = await this.plansUserRepository.findByActive(
      user_id,
      enterprise_id,
    );

    if (!currentPlan) {
      throw new AppError(
        'User doesnt have an active plan for this enterprise.',
      );
    }

    if (isBefore(currentPlan.expiration_at, new Date())) {
      throw new AppError('User plan expired.');
    }

    if (!currentPlan.active) {
      throw new AppError('User plan not active.');
    }

    if (enterprise?.owner_id === user_id) {
      const ownerAppointment = await this.appointmentsRepository.create({
        service_id,
        user_id,
        date: formattedServiceDate,
        enterprise_id,
      });

      return ownerAppointment;
    }

    const isUserInThisServiceAppointment = await this.appointmentsRepository.findByServiceAndUserId(
      user_id,
      service_id,
    );

    if (isUserInThisServiceAppointment) {
      throw new AppError('You are already on the service.');
    }

    const userAppointments = await this.appointmentsRepository.findAllFromUserInThisEnterprise(
      user_id,
      enterprise_id,
    );

    const futureAppointments = userAppointments.filter(appointment =>
      isAfter(appointment.date, new Date()),
    );

    if (futureAppointments.length > 0 && !service.pending_scheduling) {
      throw new AppError(
        'You already have a pending appointment with this enterprise.',
      );
    }

    const usersInService = await this.appointmentsRepository.usersInService(
      service_id,
    );

    if (Number(usersInService) >= Number(service.capacity)) {
      throw new AppError('This appointment is full.');
    }

    const planAppointmentsCapacity = await this.plansRepository.findById(
      currentPlan.plan_id,
    );
    const allUsersAppointmentsFromThisEnterprise = await this.appointmentsRepository.searchAllAppointmentsFromUserBetweenDate(
      {
        createAt: currentPlan.created_at,
        expirationAt: currentPlan.expiration_at,
        user_id,
        enterprise_id: service.enterprise_id,
      },
    );

    if (
      Number(allUsersAppointmentsFromThisEnterprise.length) >=
      Number(planAppointmentsCapacity?.schedule_limit)
    ) {
      throw new AppError(
        `you can schedule ${Number(
          planAppointmentsCapacity?.schedule_limit,
        )} times and ${Number(
          allUsersAppointmentsFromThisEnterprise.length,
        )} has already been scheduled`,
      );
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

    const appointment = await this.appointmentsRepository.create({
      service_id,
      user_id,
      date: formattedServiceDate,
      enterprise_id,
    });

    return appointment;

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
  }
}

export default CreateAppointmentService;
