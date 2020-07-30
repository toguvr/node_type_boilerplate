import Appointment from '../infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';
import IFindAllInMonthFromProviderDTO from '../dtos/IFindAllInMonthFromProviderDTO';
import IFindAllUserAppoinrmentFromEnterpriseDTO from '../dtos/IFindAllUserAppoinrmentFromEnterpriseDTO';

export default interface IAppointmentsRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
  findByDate(date: Date, provider_id: string): Promise<Appointment | undefined>;
  findAllInMonthFromProvider(
    data: IFindAllInMonthFromProviderDTO,
  ): Promise<Appointment[]>;
  searchAllAppointmentsFromUserBetweenDate(
    data: IFindAllUserAppoinrmentFromEnterpriseDTO,
  ): Promise<Appointment[]>;
  findAllFromUser(user_id: string): Promise<Appointment[]>;
  findAllFromUserInThisEnterprise(
    user_id: string,
    enterprise_id: string,
  ): Promise<Appointment[]>;
  usersInService(service_id: string): Promise<number>;
  findByServiceAndUserId(
    user_id: string,
    service_id: string,
  ): Promise<Appointment | undefined>;
}
