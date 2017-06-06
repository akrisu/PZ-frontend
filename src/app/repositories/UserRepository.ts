import { Injectable } from '@angular/core';
import { Http, HttpModule } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { Credentials } from './../interfaces/Credentials.interface';

@Injectable()
export class UserRepository {
    private readonly url = 'http://localhost:8085/api';

    constructor(
        private $http: Http
    ) {}

    public login(loginForm: Credentials): Promise<any> {
        return this.$http.post(this.url + '/user/login', loginForm)
            .toPromise()
            .then((response: any) => {
                return response.json();
            });
    }

    public register(registerForm: Credentials): Promise<any> {
        return this.$http.post(this.url + '/user/register', registerForm)
            .toPromise()
            .then((response: any) => {
                return response;
            });
    }
}
