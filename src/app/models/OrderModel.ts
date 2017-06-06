import { DriverModel } from './DriverModel';
import { VehicleModel } from './VehicleModel';

export class OrderModel {
  constructor(
    public id: string,
    public start: string,
    public end: string,
    public loadVolume: number,
    public loadCapacity: number,
    public finished: boolean,
    public driver: DriverModel,
    public vehicle: VehicleModel
  ) {}
}
