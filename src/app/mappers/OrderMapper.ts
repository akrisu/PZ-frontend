import { OrderModel } from '../models/OrderModel';
import { Driver } from '../interfaces/Driver.interface';
import { DriverMapper } from './DriverMapper';
import { VehicleMapper } from './VehicleMapper';

export class OrderMapper {
  public mapDataToModel(data: any): OrderModel {
    console.log(data);
    return new OrderModel(
      data._id,
      data.start,
      data.end,
      data.loadVolume,
      data.loadCapacity,
      data.finished,
      new DriverMapper().mapDataToModel(data.driver),
      new VehicleMapper().mapDataToModel(data.vehicle)
    );
  }
}
