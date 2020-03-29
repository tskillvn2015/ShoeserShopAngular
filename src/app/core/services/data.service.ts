import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { SystemConstants } from '../common/system.constants';
import { AuthenService } from '../services/authen.service';
import { map } from 'rxjs/operators';
import { MessageContstants } from '../common/message.constants';
import { NotificationService } from '../services/notification.service';
import { UtilityService } from '../services/utility.service';

import { Observable, from } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private _http: HttpClient, private _router: Router, private _authenService: AuthenService, private _notificationService: NotificationService
    , private _utilityService: UtilityService) {
  }

  get(uri: string) {
    let headers: HttpHeaders;
    if (this._authenService.getLoggedInUser() == null)
      headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    else headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer' + this._authenService.getLoggedInUser().token });
    return this._http.get(SystemConstants.BASE_API + uri, { headers: headers }).pipe(map(this.extractData));
  }
  post(uri: string, data?: any) {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer' + this._authenService.getLoggedInUser().token });
    return this._http.post(SystemConstants.BASE_API + uri, data, { headers: headers }).pipe(map(this.extractData));
  }
  put(uri: string, data?: any) {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer' + this._authenService.getLoggedInUser().token });
    return this._http.put(SystemConstants.BASE_API + uri, data, { headers: headers }).pipe(map(this.extractData));
  }
  delete(uri: string, key: string, id: string) {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer' + this._authenService.getLoggedInUser().token });
    return this._http.delete(SystemConstants.BASE_API + uri + "/?" + key + "=" + id, { headers: headers }).pipe(map(this.extractData));
  }
  postFile(uri: string, data?: any) {
    let newHeader = new HttpHeaders();
    newHeader.delete('Authorization');
    newHeader.append('Authorization', 'Bearer' + this._authenService.getLoggedInUser().token)
    return this._http.post(SystemConstants.BASE_API + uri, data, { headers: newHeader }).pipe(map(this.extractData));
  }
  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  getOrderDetail(id) {
    let headers: HttpHeaders;
    var orders
    if (this._authenService.getLoggedInUser() == null)
      headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    else headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer' + this._authenService.getLoggedInUser().token });
    this._http.get(SystemConstants.BASE_API + `/api/orderdetails?Id=${id}`, { headers: headers }).subscribe((response: any) => {
      if (response.Code === '200') {
        orders = response.Content.Items;
      } else {
        this._notificationService.printErrorMessage(response['Code'] + ' : ' + response['Message']);
      };
    });
    return orders;
  }
  public handleError(error: any) {
    if (error.status == 401) {
      localStorage.removeItem(SystemConstants.CURRENT_USER);
      this._notificationService.printErrorMessage(MessageContstants.LOGIN_AGAIN_MSG);
      this._utilityService.navigateToLogin();
    }
    else {
      let errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Lỗi hệ thống';
      this._notificationService.printErrorMessage(errMsg);

      return Observable.throw(errMsg);
    }

  }


}
