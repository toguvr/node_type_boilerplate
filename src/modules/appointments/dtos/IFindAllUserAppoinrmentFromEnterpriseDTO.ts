export default interface IFindAllUserAppoinrmentFromEnterpriseDTO {
  createAt: Date;
  expirationAt: Date | null;
  user_id: string;
  enterprise_id: string;
}
