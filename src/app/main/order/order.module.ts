import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderComponent } from './order.component';
import { FormsModule } from '@angular/forms';
import { PaginationModule, ModalModule } from 'ngx-bootstrap';
import { DataService } from 'src/app/core/services/data.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { RouterModule, Routes } from '@angular/router';
import { DetailComponent } from '../order-detail/detail.component';
import { BrowserModule } from '@angular/platform-browser';

const orderRoutes : Routes=[
  {path:'',redirectTo:'index',pathMatch:'full'},

  {path:'index',component:OrderComponent},

]

@NgModule({
  declarations: [OrderComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(orderRoutes),
    FormsModule,
    PaginationModule,
    ModalModule.forRoot(),
  ],
  providers: [DataService,NotificationService,BrowserModule]
})
export class OrderModule { }
