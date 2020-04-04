import { Component, OnInit, ViewChild } from '@angular/core';
import { NotificationService } from '../core/services/notification.service';
import { AuthenService } from '../core/services/authen.service';
import { MessageContstants } from '../core/common/message.constants';
import { UrlConstants } from '../core/common/url.constants';
import { Router } from '@angular/router'
import { DataService } from '../core/services/data.service';
import { SystemConstants } from '../core/common/system.constants';
import * as jwt_decode from 'jwt-decode';
import { LoggedInUser } from '../core/domain/loggedin.account';
import { ModalDirective } from 'ngx-bootstrap';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  _authenService: AuthenService;
  _dataService: DataService;
  _notificationService: NotificationService;
  loading = false;
  model: any = {};
  private user: LoggedInUser;
  @ViewChild('modalAddEdit') public modalAddEdit: ModalDirective;
  public entity: any;

  constructor(private authenService: AuthenService
    , private notificationService: NotificationService
    , private router: Router, private dataService: DataService, ) {
    this._authenService = authenService;
    this._dataService = dataService;
    this._notificationService = notificationService;
  }

  ngOnInit(): void {
  }


  showAddModal() {
    this.entity = {};
    this.modalAddEdit.show();
  }


  saveChange(valid: boolean) {
    console.log(this.entity);
    if (valid) {
      if (this.entity.Id == undefined) {
        this._dataService.register('/api/register', JSON.stringify(this.entity))
          .subscribe((response: any) => {
            if (response.Code === '200') {
              this.modalAddEdit.hide();
              this._notificationService.printSuccessMessage(MessageContstants.CREATED_OK_MSG);
            } else {
              this._notificationService.printErrorMessage(response.Code + ' : ' + response.Message);
            }

          }, error => this._dataService.handleError(error));
      }
    }
  }
  login() {
    const body = {
      username: encodeURIComponent(this.model.username),
      password: encodeURIComponent(this.model.password)
    };

    this.loading = true;
    this._authenService.login('/api/login', body).subscribe((response: any) => {
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
          if (this.user.role === 'Admin' || this.user.role === 'Moderator')
            this.router.navigate([UrlConstants.HOME]);
          else if (this.user.role === 'Customer') {
            this.router.navigate([UrlConstants.SHOP]);
          } else {
            this._notificationService.printErrorMessage("your role is not valid");
            this.loading = false;
          }

        } else {
          this._notificationService.printErrorMessage("token is not init");
          this.loading = false;
        }
      } else {
        this._notificationService.printErrorMessage(response['Code'] + ' : ' + response['Message']);
        this.loading = false;
      }

    }, error => {
      this.notificationService.printErrorMessage(error.message);
      this.loading = false;
    });
  }
}
