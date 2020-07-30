import { Router } from 'express';

import { celebrate, Segments, Joi } from 'celebrate';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import PlansController from '../controllers/PlansController';
import PlansUserController from '../controllers/PlansUserController';

const planRouter = Router();
const plansController = new PlansController();
const plansUserController = new PlansUserController();

planRouter.use(ensureAuthenticated);

planRouter.get('/', plansController.index);

planRouter.get('/all/user', plansUserController.showAllUser);

planRouter.get('/all/enterprise', plansUserController.showAllEnterprise);

planRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      price: Joi.number().required(),
      schedule_limit: Joi.number().required(),
      days_to_expire: Joi.number().required(),
    },
  }),
  plansController.create,
);

planRouter.post(
  '/active',
  celebrate({
    [Segments.BODY]: {
      recipient_id: Joi.string().uuid().required(),
      plan_id: Joi.string().uuid().required(),
    },
  }),
  plansUserController.create,
);

planRouter.put(
  '/:active_plan_id/cancel',
  celebrate({
    [Segments.PARAMS]: {
      active_plan_id: Joi.string().uuid().required(),
    },
  }),
  plansUserController.update,
);

export default planRouter;
