import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop.component';
import { AuthenService } from '../core/services/authen.service';
import { UtilityService } from '../core/services/utility.service';
import { shopRoutes } from './shop.route';
import { RouterModule } from '@angular/router';
import { HomeModule } from './home/home.module';



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
