import { Router } from 'express';

import { celebrate, Segments, Joi } from 'celebrate';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import EnterpriseInviteController from '../controllers/EnterpriseInviteController';

const enterprisesInviteRouter = Router();

const enterpriseInviteController = new EnterpriseInviteController();

enterprisesInviteRouter.use(ensureAuthenticated);

enterprisesInviteRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      enterprise_id: Joi.string().uuid().required(),
      user_id: Joi.string().uuid().required(),
    },
  }),
  enterpriseInviteController.create,
);
enterprisesInviteRouter.get(
  '/user/:user_id/enterprise/:enterprise_id/search',
  celebrate({
    [Segments.PARAMS]: {
      user_id: Joi.string().uuid(),
      enterprise_id: Joi.string().uuid(),
    },
  }),
  enterpriseInviteController.index,
);
enterprisesInviteRouter.get('/', enterpriseInviteController.allInvites);
enterprisesInviteRouter.put(
  '/accept',
  celebrate({
    [Segments.BODY]: {
      invite_id: Joi.string().uuid().required(),
    },
  }),
  enterpriseInviteController.update,
);

export default enterprisesInviteRouter;
