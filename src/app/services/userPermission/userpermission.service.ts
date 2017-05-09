import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { UserService } from './../user/user.service';

@Injectable()
export class UserPermissionService implements CanActivate {

    constructor(
        private router: Router,
        private userService: UserService
    ) { }

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        if (this.userService.isLoggedIn()) {
            return true;
        }

        this.router.navigate(['login']);

        return false;
    }
}
