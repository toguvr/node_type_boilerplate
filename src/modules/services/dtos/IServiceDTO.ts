export default interface IServiceDTO {
  start_hour: string;
  description_id: string;
  category_id: string;
  capacity: number;
  day_week: number;
  pending_scheduling?: number;
  hour_to_schedule: number;
  user_name?: string;
  enterprise_id: string;
}
