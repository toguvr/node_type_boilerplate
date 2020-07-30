export default interface ICreatePlansUserDTO {
  user_id: string;
  enterprise_id: string;
  plan_id: string;
  expiration_at: date;
}
