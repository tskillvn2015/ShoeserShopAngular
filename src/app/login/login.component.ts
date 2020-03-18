import { Component, OnInit } from '@angular/core';
import {NotificationService} from '../core/services/notification.service';
import {AuthenService} from '../core/services/authen.service';
import {MessageContstants} from '../core/common/message.constants';
import {UrlConstants} from '../core/common/url.constants';
import {Router} from '@angular/router'
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  _authenService : AuthenService;
  loading = false;
  model:any ={};
  constructor(private authenService: AuthenService
    ,private notificationService: NotificationService
    ,private router : Router) {
      this._authenService = authenService
     }

  ngOnInit(): void {
  }
  login(){
    this.loading =true;
    this._authenService.logIn(this.model.username,this.model.password).subscribe(data=>{
      this.router.navigate([UrlConstants.HOME]);
    }, error => {
      this.notificationService.printErrorMessage(error.message);
      this.loading =false;
    });
  }
}
