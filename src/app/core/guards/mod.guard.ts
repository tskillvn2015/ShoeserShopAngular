import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { SystemConstants } from '../common/system.constants';
import { UrlConstants } from '../common/url.constants';
import { LoggedInUser } from '../domain/loggedin.account';

@Injectable({
    providedIn: 'root'
})
export class ModGuard implements CanActivate {
    constructor(private router: Router) { };
    canActivate(activeRoute: ActivatedRouteSnapshot, routerState: RouterStateSnapshot) {
        if (localStorage.getItem(SystemConstants.CURRENT_USER)) {
            let user: LoggedInUser;
            var userData = JSON.parse(localStorage.getItem(SystemConstants.CURRENT_USER));
            user = {
                id: userData.id,
                username: userData.username,
                role: userData.role,
                token: userData.token
            }
            if(user.role ==='Admin'){
                return true;
            }
            if(user.role ==='Moderator'){
                return true;
            }else{
                this.router.navigate([UrlConstants.LOGIN], {
                    queryParams: {
                        returnUrl: routerState.url
                    }
                });
                return false;
            }
        }
        else {
            this.router.navigate([UrlConstants.LOGIN], {
                queryParams: {
                    returnUrl: routerState.url
                }
            });
            return false;
        }
    }

}