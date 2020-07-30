import { Request, Response } from 'express';

import ActivePlanService from '@modules/plans/services/ActivePlanService';

import { container } from 'tsyringe';

export default class PlansUserController {
  public async showAllUser(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const user_id = request.user.id;

    const activePlan = container.resolve(ActivePlanService);

    const plans = await activePlan.showAllFromUser(user_id);

    return response.json(plans);
  }

  public async showAllEnterprise(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const user_id = request.user.id;

    const activePlan = container.resolve(ActivePlanService);

    const plans = await activePlan.showAllFromEnterprise(user_id);

    return response.json(plans);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { active_plan_id } = request.params;

    const createPlan = container.resolve(ActivePlanService);

    const plans = await createPlan.cancel(active_plan_id);

    return response.json(plans);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { recipient_id, plan_id } = request.body;

    const createPlan = container.resolve(ActivePlanService);

    const plan = await createPlan.execute({
      recipient_id,
      plan_id,
      user_id,
    });

    return response.json(plan);
  }
}
