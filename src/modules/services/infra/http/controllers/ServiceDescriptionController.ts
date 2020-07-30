import { Request, Response } from 'express';

import CreateServiceDescriptionService from '@modules/services/services/CreateServiceDescriptionService';

import { container } from 'tsyringe';

export default class ServiceDescriptionController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const createServiceDescriptionService = container.resolve(
      CreateServiceDescriptionService,
    );

    const serviceDescription = await createServiceDescriptionService.showAll(
      user_id,
    );

    return response.json(serviceDescription);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { title, description } = request.body;

    const createServiceDescriptionService = container.resolve(
      CreateServiceDescriptionService,
    );

    const serviceDescription = await createServiceDescriptionService.execute({
      title,
      description,
      user_id,
    });

    return response.json(serviceDescription);
  }
}
