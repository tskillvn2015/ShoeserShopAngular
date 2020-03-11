import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { mainRoutes} from './main.route';
import { Routes,RouterModule} from '@angular/router';
import {AccountModule}from './account/account.module';
import {HomeModule} from './home/home.module';



@NgModule({
  declarations: [MainComponent],
  imports: [
    CommonModule,
    HomeModule,
    AccountModule,
    RouterModule.forChild(mainRoutes)
  ]
})
export class MainModule { }
