import { Request, Response } from 'express';

import CreatePlanService from '@modules/plans/services/CreatePlanService';

import { container } from 'tsyringe';

export default class PlansController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const createPlan = container.resolve(CreatePlanService);

    const plans = await createPlan.showAll(user_id);

    return response.json(plans);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { name, price, schedule_limit, days_to_expire } = request.body;

    const createPlan = container.resolve(CreatePlanService);

    const plan = await createPlan.execute({
      name,
      price,
      schedule_limit,
      days_to_expire,
      user_id,
    });

    return response.json(plan);
  }
}
