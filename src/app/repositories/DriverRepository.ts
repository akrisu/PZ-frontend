import { DriverForm } from '../forms/DriverForm';
import { Injectable } from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class DriverRepository {
    private readonly url = 'http://localhost:8080/api';

    constructor(
        private $http: Http,
        private $authHttp: AuthHttp
    ) {}

    public createDriver(driverForm: DriverForm): Promise<any> {
        return this.$authHttp.post(this.url + '/driver', driverForm)
            .toPromise()
            .then((response: any) => {
                return response.json();
            });
    }
}
