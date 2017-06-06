import { Injectable } from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { Vehicle } from '../interfaces/Vehicle.interface';
import { VehicleMapper } from '../mappers/VehicleMapper';

@Injectable()
export class VehicleRepository {
    private readonly url = 'http://localhost:8085/api';

    constructor(
        private $http: Http,
        private $authHttp: AuthHttp
    ) {}

    public createVehicle(vehicleForm: Vehicle): Promise<any> {
        return this.$authHttp.post(this.url + '/vehicle', vehicleForm)
            .toPromise()
            .then((response: any) => response.json());
    }

    public getVehicles(): Promise<Array<Vehicle>> {
        return this.$authHttp.get(this.url + '/vehicle')
            .toPromise()
            .then((response: any) => response.json())
            .then((response: any) => response.vehicleList.map((data: any) => new VehicleMapper().mapDataToModel(data)));
    }
    public getAvaliableVehicles(): Promise<Array<Vehicle>> {
        return this.$authHttp.get(this.url + '/vehicle/avaliable')
            .toPromise()
            .then((response: any) => response.json())
            .then((response: any) => response.vehicleList.map((data: any) => new VehicleMapper().mapDataToModel(data)));
    }

    public deleteVehicle(id: string): Promise<any> {
        return this.$authHttp.delete(this.url + '/vehicle/' + id)
            .toPromise()
            .then((response: any) => response.json());
    }
}
