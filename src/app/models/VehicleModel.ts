export class VehicleModel {
  constructor(
    public id: string,
    public registrationNumber: string,
    public volume: number,
    public capacity: number,
    public inUse: boolean
  ) {}
}
