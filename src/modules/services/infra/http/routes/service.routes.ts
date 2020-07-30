import { Router } from 'express';

import { celebrate, Segments, Joi } from 'celebrate';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import ServiceDescriptionController from '../controllers/ServiceDescriptionController';
import ServiceCategoryController from '../controllers/ServiceCategoryController';
import ServiceController from '../controllers/ServiceController';

const servicesRouter = Router();
const serviceDescriptionController = new ServiceDescriptionController();
const serviceCategoryController = new ServiceCategoryController();
const serviceController = new ServiceController();

servicesRouter.use(ensureAuthenticated);

servicesRouter.get(
  '/enterprise/:enterprise_id/day/:day_week',
  serviceController.index,
);

servicesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      dataArray: Joi.array().required(),
    },
  }),
  serviceController.create,
);

servicesRouter.get('/description', serviceDescriptionController.index);

servicesRouter.post(
  '/description',
  celebrate({
    [Segments.BODY]: {
      title: Joi.string().required(),
      description: Joi.string().required(),
    },
  }),
  serviceDescriptionController.create,
);

servicesRouter.get('/category/:enterprise_id', serviceCategoryController.index);

servicesRouter.post(
  '/category',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
  }),
  serviceCategoryController.create,
);

export default servicesRouter;
