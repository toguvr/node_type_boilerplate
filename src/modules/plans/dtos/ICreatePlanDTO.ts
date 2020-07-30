export default interface ICreatePlanDTO {
  name: string;
  enterprise_id: string;
  price: number;
  schedule_limit: number;
  days_to_expire: number;
}
