import { VehicleModel } from '../models/VehicleModel';


export class VehicleMapper {
  public mapDataToModel(data: any) {
    return new VehicleModel(data._id, data.registrationNumber, data.volume, data.capacity, data.inUse);
  }
}
