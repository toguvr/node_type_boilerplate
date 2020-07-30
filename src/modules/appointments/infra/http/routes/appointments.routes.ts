import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import AppointmentsController from '../controllers/AppointmentsController';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get('/me', appointmentsController.index);

appointmentsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      service_id: Joi.string().uuid().required(),
      enterprise_id: Joi.string().uuid().required(),
    },
  }),
  appointmentsController.create,
);

export default appointmentsRouter;
