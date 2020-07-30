import ServiceCategory from '../infra/typeorm/entities/ServiceCategory';
import IServiceCategoryDTO from '../dtos/IServiceCategoryDTO';

export default interface IServiceCategoryRepository {
  create(data: IServiceCategoryDTO): Promise<ServiceCategory>;
  findById(id: string): Promise<ServiceCategory | undefined>;
  findByEnterpriseId(enterprise_id: string): Promise<ServiceCategory[]>;
  save(serviceCategory: ServiceCategory): Promise<ServiceCategory>;
}
