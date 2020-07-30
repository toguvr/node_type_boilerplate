import Service from '../infra/typeorm/entities/Service';
import IServiceDTO from '../dtos/IServiceDTO';

interface ISearchData {
  enterprise_id: string;
  day_week: string;
}

export default interface IServiceRepository {
  create(data: IServiceDTO[]): Promise<Service[]>;
  findById(id: string): Promise<Service | undefined>;
  findByEnterpriseId(enterprise_id: string): Promise<Service[]>;
  findByDayWeekAndEnterpriseId(searchData: ISearchData): Promise<Service[]>;
  save(service: Service[]): Promise<Service[]>;
}
