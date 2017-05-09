import { Injectable } from '@angular/core';
import { JwtHelper } from 'angular2-jwt';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { UserService } from './../user/user.service';

@Injectable()
export class AdminPermissionService implements CanActivate {

    constructor(
        private router: Router,
        private userService: UserService
    ) { }

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        if (this.userService.isLoggedIn() && this.userService.hasAdminRole()) {
            return true;
        }

        this.userService.logout();
        return false;
    }
}
