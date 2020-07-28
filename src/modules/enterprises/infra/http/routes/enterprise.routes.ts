import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';

import { celebrate, Segments, Joi } from 'celebrate';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import EnterprisesController from '../controllers/EnterprisesController';
import EnterpriseLogoController from '../controllers/EnterpriseLogoController';

const enterprisesRouter = Router();
const upload = multer(uploadConfig.multer);
const enterprisesController = new EnterprisesController();
const enterpriseLogoController = new EnterpriseLogoController();
enterprisesRouter.use(ensureAuthenticated);

enterprisesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      area: Joi.string().required(),
      address: Joi.string().required(),
      open_hour: Joi.string().required(),
      close_hour: Joi.string().required(),
      primary_color: Joi.string().required(),
      secondary_color: Joi.string().required(),
      isPrivate: Joi.boolean(),
    },
  }),
  enterprisesController.create,
);

enterprisesRouter.patch(
  '/logo',
  ensureAuthenticated,
  upload.single('logo'),
  enterpriseLogoController.update,
);

export default enterprisesRouter;
