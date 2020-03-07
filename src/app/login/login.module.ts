import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import {Routes,RouterModule}from '@angular/router';
export const routers:Routes =[
  {path:'',component:LoginComponent}
];


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routers)
  ]
})
export class LoginModule { }
