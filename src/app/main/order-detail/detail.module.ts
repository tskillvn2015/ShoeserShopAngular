import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailComponent } from './detail.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PaginationModule, ModalModule } from 'ngx-bootstrap';
import { DataService } from 'src/app/core/services/data.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { BrowserModule } from '@angular/platform-browser';

const orderDetailRoutes : Routes=[
  {path:'',redirectTo:'./index',pathMatch:'full'},

  {path:':id',component:DetailComponent},

  {path:'detail',component:DetailComponent},

  {path:'detail/:id',component:DetailComponent},
]


@NgModule({
  declarations: [DetailComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(orderDetailRoutes),
    FormsModule,
    PaginationModule,
    ModalModule.forRoot(),
  ],
  providers: [DataService,NotificationService]
})
export class DetailModule { }
