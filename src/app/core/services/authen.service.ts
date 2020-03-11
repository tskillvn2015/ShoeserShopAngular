import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { SystemConstants } from '../common/system.constants';
import { map, filter, switchMap } from 'rxjs/operators';
import { LoggedInUser } from '../domain/loggedin.account'


@Injectable({
  providedIn: 'root'
})
export class AuthenService {

  constructor(private _http: HttpClient) { }

  logIn(username: string, password: string) {
    let body =
      "userName=" + encodeURIComponent(username)
      + "&password=" + encodeURIComponent(password);
    let headers = new HttpHeaders();
    headers.append("Content-Type", "application/json");

    return this._http.post(SystemConstants.BASE_API + '/api/login', body, { headers }).pipe(map((response: any) => {
      let user: LoggedInUser = response.json();
      if (user && user.token) {
        localStorage.removeItem(SystemConstants.CURRENT_USER);
        localStorage.setItem(SystemConstants.CURRENT_USER, JSON.stringify(user));
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
  getLoggedInUser(): LoggedInUser {
    let user: LoggedInUser;
    if (this.isUserAuthenticated) {
      var userData = JSON.parse(localStorage.getItem(SystemConstants.CURRENT_USER));
      user = new LoggedInUser(userData.token);
    }
    return null;
  }
}
