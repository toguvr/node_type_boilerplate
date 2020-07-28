import { Request, Response } from 'express';

import { container } from 'tsyringe';
import UpdateEnterpriseLogoService from '@modules/enterprises/services/UpdateEnterpriseLogoService';
import { classToClass } from 'class-transformer';

export default class EnterpriseLogoController {
  async update(request: Request, response: Response): Promise<Response> {
    const updateEnterpriseLogo = container.resolve(UpdateEnterpriseLogoService);
    const enterprise = await updateEnterpriseLogo.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    });

    return response.json(classToClass(enterprise));
  }
}
