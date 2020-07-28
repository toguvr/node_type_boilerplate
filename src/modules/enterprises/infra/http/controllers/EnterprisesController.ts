import { Request, Response } from 'express';

import CreateEnterpriseService from '@modules/enterprises/services/CreateEnterpriseService';

import { container } from 'tsyringe';

export default class EnterpriseController {
  public async create(request: Request, response: Response): Promise<Response> {
    const owner_id = request.user.id;
    const {
      name,
      area,
      address,
      open_hour,
      close_hour,
      primary_color,
      secondary_color,
      isPrivate,
    } = request.body;

    const createEnterprise = container.resolve(CreateEnterpriseService);

    const enterprise = await createEnterprise.execute({
      name,
      area,
      address,
      open_hour,
      close_hour,
      primary_color,
      secondary_color,
      isPrivate,
      owner_id,
    });

    return response.json(enterprise);
  }
}
