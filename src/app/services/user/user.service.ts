import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tokenNotExpired, JwtHelper } from 'angular2-jwt';

import { UserRepository } from './../../repositories/UserRepository';
import { Credentials } from './../../interfaces/Credentials.interface';

@Injectable()
export class UserService {
    constructor(
        private userRepository: UserRepository,
        private router: Router
    ) {}

    public login(loginForm: Credentials): void {
        this.userRepository.login(loginForm)
        .then((response: any) => {
            localStorage.setItem('id_token', response.token);

            this.router.navigate(['dashboard']);
        })
        .catch((err) => {
        });
    }

    public register(registerForm: Credentials): void {
        this.userRepository.register(registerForm)
        .then((response: any) => {
            this.login(registerForm);
        })
        .catch((err) => {
        });
    }

    public isLoggedIn(): boolean {
        return tokenNotExpired('id_token');
    }

    public hasAdminRole(): boolean {
        const jwtHelper = new JwtHelper();
        const payload: any = jwtHelper.decodeToken(localStorage.getItem('id_token'));

        return payload.role === 'admin';
    }

    public getUserId(): string {
        const jwtHelper = new JwtHelper();
        const payload: any = jwtHelper.decodeToken(localStorage.getItem('id_token'));

        return payload.userId;
    }

    public logout(): void {
        localStorage.removeItem('id_token');

        this.router.navigate(['login']);
    }

}
