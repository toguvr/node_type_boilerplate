import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';

import { celebrate, Segments, Joi } from 'celebrate';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import EnterprisesController from '../controllers/EnterprisesController';
import EnterpriseAvatarController from '../controllers/EnterpriseAvatarController';

const enterprisesRouter = Router();
const upload = multer(uploadConfig.multer);
const enterprisesController = new EnterprisesController();
const enterpriseAvatarController = new EnterpriseAvatarController();
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
      private: Joi.boolean().required(),
    },
  }),
  enterprisesController.create,
);

enterprisesRouter.patch(
  '/logo',
  ensureAuthenticated,
  upload.single('logo'),
  enterpriseAvatarController.update,
);

export default enterprisesRouter;
