export class DriverModel {
  constructor(
    public id: string,
    public firstName: string,
    public lastName: string,
    public workerId: number,
    public phone: string,
    public workStartDate: Date,
    public inUse: boolean
  ) {}
}
