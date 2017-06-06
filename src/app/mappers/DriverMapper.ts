import { DriverModel } from '../models/DriverModel';

export class DriverMapper {
  public mapDataToModel(data: any): DriverModel {
    return new DriverModel(data._id, data.firstName, data.lastName, data.workerId, data.phone, data.workStartDate, data.inUse);
  }
}
