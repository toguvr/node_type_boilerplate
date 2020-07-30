import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IEnterprisesRepository from '@modules/enterprises/repositories/IEnterprisesRepository';
import EnterprisesRepository from '@modules/enterprises/infra/typeorm/repositories/EnterprisesRepository';

import IEnterprisesUsersRepository from '@modules/enterprises/repositories/IEnterprisesUsersRepository';
import EnterprisesUsersRepository from '@modules/enterprises/infra/typeorm/repositories/EnteprisesInviteRepository';

import IPlansRepository from '@modules/plans/repositories/IPlansRepository';
import PlansRepository from '@modules/plans/infra/typeorm/repositories/PlansRepository';

import IPlansUserRepository from '@modules/plans/repositories/IPlansUserRepository';
import PlansUserRepository from '@modules/plans/infra/typeorm/repositories/PlansUserRepository';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

import IServiceDescriptionRepository from '@modules/services/repositories/IServiceDescriptionRepository';
import ServiceDescriptionRepository from '@modules/services/infra/typeorm/repositories/ServiceDescriptionRepository';

import IServiceCategoryRepository from '@modules/services/repositories/IServiceCategoryRepository';
import ServiceCategoryRepository from '@modules/services/infra/typeorm/repositories/ServiceCategoryRepository';

import IServiceRepository from '@modules/services/repositories/IServiceRepository';
import ServiceRepository from '@modules/services/infra/typeorm/repositories/ServiceRepository';

import INotificationRepository from '@modules/notifications/repositories/INotificationRepository';
import NotificationsRepository from '@modules/notifications/infra/typeorm/repositories/NotificationsRepository';

container.registerSingleton<IAppointmentsRepository>(
  'AppointmentsRepository',
  AppointmentsRepository,
);

container.registerSingleton<IServiceRepository>(
  'ServiceRepository',
  ServiceRepository,
);

container.registerSingleton<IServiceCategoryRepository>(
  'ServiceCategoryRepository',
  ServiceCategoryRepository,
);

container.registerSingleton<IPlansRepository>(
  'PlansRepository',
  PlansRepository,
);

container.registerSingleton<IPlansUserRepository>(
  'PlansUserRepository',
  PlansUserRepository,
);

container.registerSingleton<IServiceDescriptionRepository>(
  'ServiceDescriptionRepository',
  ServiceDescriptionRepository,
);

container.registerSingleton<IEnterprisesRepository>(
  'EnterprisesRepository',
  EnterprisesRepository,
);

container.registerSingleton<IEnterprisesUsersRepository>(
  'EnterprisesUsersRepository',
  EnterprisesUsersRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);

container.registerSingleton<INotificationRepository>(
  'NotificationsRepository',
  NotificationsRepository,
);
