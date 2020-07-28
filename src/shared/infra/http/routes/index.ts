import { Router } from 'express';
import appointmentRouter from '@modules/appointments/infra/http/routes/appointments.routes';
import userRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';
import providersRouter from '@modules/appointments/infra/http/routes/provider.routes';
import enterprisesRouter from '@modules/enterprises/infra/http/routes/enterprise.routes';

const routes = Router();

routes.use('/appointments', appointmentRouter);
routes.use('/users', userRouter);
routes.use('/enterprises', enterprisesRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);
routes.use('/provider', providersRouter);

export default routes;
