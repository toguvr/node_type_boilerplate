import { Request, Response } from 'express';

import CreateServiceCategoryService from '@modules/services/services/CreateServiceCategoryService';

import { container } from 'tsyringe';

export default class ServiceCategoryController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { enterprise_id } = request.params;

    const createServiceCategoryService = container.resolve(
      CreateServiceCategoryService,
    );

    const serviceCategory = await createServiceCategoryService.showAll(
      enterprise_id,
    );

    return response.json(serviceCategory);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { name } = request.body;

    const createServiceCategoryService = container.resolve(
      CreateServiceCategoryService,
    );

    const serviceCategory = await createServiceCategoryService.execute({
      name,
      user_id,
    });

    return response.json(serviceCategory);
  }
}
