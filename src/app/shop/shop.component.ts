import { Component, OnInit } from '@angular/core';
import { LoggedInUser } from '../core/domain/loggedin.account';
import { UtilityService } from '../core/services/utility.service';
import { AuthenService } from '../core/services/authen.service';
import { SystemConstants } from '../core/common/system.constants';
import { UrlConstants } from '../core/common/url.constants';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  public user: LoggedInUser;
  constructor(private _utilityService: UtilityService,private _authenService:AuthenService) {
   }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem(SystemConstants.CURRENT_USER));
  }
  logout(){
    localStorage.removeItem(SystemConstants.CURRENT_USER);
    this._utilityService.navigate(UrlConstants.LOGIN);
  }
  IsAuthenticatedCustomer(): boolean{
    return this._authenService.isUserAuthenticated();
  }
  IsAuthenticatedMod(): boolean{
    if(this._authenService.isUserAuthenticated()){
      if(this._authenService.isModAuthenticated()){
        return true;
      }
    }
    return false;
  }

  logIn(){
    this._utilityService.navigate(UrlConstants.LOGIN);
  }
}
