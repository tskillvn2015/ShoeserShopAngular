import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import {Routes,RouterModule}from '@angular/router';
import {FormsModule} from '@angular/forms';
import {NotificationService} from '../core/services/notification.service';
import {AuthenService} from '../core/services/authen.service';

export const routers:Routes =[
  {path:'',component:LoginComponent}
];


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routers)
  ],
  providers:[NotificationService,AuthenService],
})
export class LoginModule { }
