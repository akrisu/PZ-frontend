import { Driver } from '../interfaces/Driver.interface';
import { Injectable } from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { DriverMapper } from '../mappers/DriverMapper';
import { DriverModel } from '../models/DriverModel';

@Injectable()
export class DriverRepository {
    private readonly url = 'http://localhost:8085/api';

    constructor(
        private $http: Http,
        private $authHttp: AuthHttp
    ) {}

    public createDriver(driverForm: Driver): Promise<any> {
        return this.$authHttp.post(this.url + '/driver', driverForm)
            .toPromise()
            .then((response: any) => response.json());
    }

    public getAvaliableDrivers(): Promise<Array<DriverModel>> {
        return this.$authHttp.get(this.url + '/driver/avaliable')
            .toPromise()
            .then((response: any) => response.json())
            .then((response: any) => {
                return response.driverList.map((data: any) => {
                    return new DriverMapper().mapDataToModel(data);
                });
            });
    }

    public getDrivers(): Promise<Array<DriverModel>> {
        return this.$authHttp.get(this.url + '/driver')
            .toPromise()
            .then((response: any) => response.json())
            .then((response: any) => {
                return response.driverList.map((data: any) => {
                    return new DriverMapper().mapDataToModel(data);
                });
            });
    }

    public deleteVehicle(id: string): Promise<any> {
        return this.$authHttp.delete(this.url + '/driver/' + id)
            .toPromise()
            .then((response: any) => response.json());
    }

}
