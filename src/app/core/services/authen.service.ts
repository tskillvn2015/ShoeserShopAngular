import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { SystemConstants } from '../common/system.constants';
import { map } from 'rxjs/operators';
import { LoggedInUser } from '../domain/loggedin.account';
import { NotificationService } from '../services/notification.service';
import * as jwt_decode from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class AuthenService {
  private user: LoggedInUser;
  constructor(private _http: HttpClient, private _notificationService: NotificationService) { }

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }
  login(uri: string, data?: any){
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this._http.post(SystemConstants.BASE_API + uri, data, { headers: headers }).pipe(map(this.extractData));
  }
  logIn(username: string, password: string) {
    const body = {
      username: encodeURIComponent(username),
      password: encodeURIComponent(password)
    };

    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this._http.post(SystemConstants.BASE_API + '/api/login', body, { headers }).pipe(map((response: any) => {
      if (response['Code'] === '200') {
        var token = response['Content']['token'];
        var decoded = jwt_decode(token);
        this.user = {
          id: decoded.Id,
          username: decoded.Username,
          role: decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'],
          token: token
        };
        if (this.user && this.user.token) {
          localStorage.removeItem(SystemConstants.CURRENT_USER);
          localStorage.setItem(SystemConstants.CURRENT_USER, JSON.stringify(this.user));
        } else {
          this._notificationService.printErrorMessage("token is not init");
        }
      } else {
        this._notificationService.printErrorMessage(response['Code'] + ' : ' + response['Message']);
      }

    }))
  }
  logOut() {
    localStorage.removeItem(SystemConstants.CURRENT_USER);
  }

  isUserAuthenticated(): boolean {
    let user = localStorage.getItem(SystemConstants.CURRENT_USER);
    if (user != null) {
      return true;
    } else {
      return false;
    }
  }
  isModAuthenticated(): boolean{
    let role = JSON.parse(localStorage.getItem(SystemConstants.CURRENT_USER)).role;
    if (role === 'Admin' || role ==='Moderator') {
      return true;
    } else {
      return false;
    }
  }
  getLoggedInUser(): LoggedInUser {
    let user: LoggedInUser;
    if (this.isUserAuthenticated()) {
      var userData = JSON.parse(localStorage.getItem(SystemConstants.CURRENT_USER));
      user = {
        id: userData.id,
        username: userData.username,
        role: userData.role,
        token: userData.token
      };
      return user;
    }
    return null;
  }
  storeToken(token: string) {
    localStorage.setItem("token", token);
  }
  getToken() {
    return localStorage.getItem("token");
  }
  removeToken() {
    return localStorage.removeItem("token");
  }
}
