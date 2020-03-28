import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes,RouterModule} from '@angular/router';
import {HomeModule} from './home/home.module';
import {UtilityService} from '../core/services/utility.service';
import {AuthenService} from '../core/services/authen.service';
import { ShopComponent } from './shop.component';
import {shopRoutes} from './shop.route';



@NgModule({
  declarations: [ShopComponent],
  imports: [
    CommonModule,
    HomeModule,
    RouterModule.forChild(shopRoutes)
  ],
  providers: [UtilityService,AuthenService]
})
export class ShopModule { }
