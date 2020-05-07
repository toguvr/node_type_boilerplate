import { Router } from 'express';
import appointmentRouter from './appointments.routes';
import userRouter from './users.routes';
import sessionsRouter from './sessions.routes';

const routes = Router();

routes.use('/appointments', appointmentRouter);
routes.use('/users', userRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
