import { Request, Response } from 'express';

import { container } from 'tsyringe';
import ListProviderMonthAvailablilityService from '@modules/appointments/services/ListProviderMonthAvailablilityService';

export default class ProviderMonthAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;

    const { month, year } = request.query;

    const listProviderMonthAvailablilityService = container.resolve(
      ListProviderMonthAvailablilityService,
    );

    const availability = await listProviderMonthAvailablilityService.execute({
      provider_id,
      month: Number(month),
      year: Number(year),
    });

    return response.json(availability);
  }
}
