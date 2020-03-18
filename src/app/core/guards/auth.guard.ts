import { Injectable } from '@angular/core';
import {CanActivate,ActivatedRouteSnapshot,RouterStateSnapshot,Router} from '@angular/router';
import { SystemConstants } from '../common/system.constants';
import { UrlConstants } from '../common/url.constants';

@Injectable({
    providedIn: 'root'
  })
export class AuthGuard implements CanActivate{
    constructor(private router:Router){};
    canActivate(activeRoute:ActivatedRouteSnapshot,routerState:RouterStateSnapshot){
        if(localStorage.getItem(SystemConstants.CURRENT_USER)){
            return true;
        }
        else{
            this.router.navigate([UrlConstants.LOGIN],{
                queryParams:{
                    returnUrl: routerState.url
                }
            });
            return false;
        }
    }
    
}