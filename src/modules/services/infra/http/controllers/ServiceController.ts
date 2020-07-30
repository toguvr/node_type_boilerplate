import { Request, Response } from 'express';

import CreateServicesService from '@modules/services/services/CreateServicesService';
import SearchServiceService from '@modules/services/services/SearchServiceService';

import { container } from 'tsyringe';

export default class ServiceController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { enterprise_id, day_week } = request.params;

    const searchServiceService = container.resolve(SearchServiceService);

    const serviceCategory = await searchServiceService.execute({
      enterprise_id,
      day_week,
    });

    return response.json(serviceCategory);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { dataArray } = request.body;

    const createServicesService = container.resolve(CreateServicesService);

    const serviceCategory = await createServicesService.execute({
      dataArray,
      user_id,
    });

    return response.json(serviceCategory);
  }
}
