import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { Routes,RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';

import { DataService } from '../../core/services/data.service';
import { NotificationService } from '../../core/services/notification.service';

const productRoutes : Routes=[
  {path:'',redirectTo:'index',pathMatch:'full'},
  {path:'index',component:ProductComponent}
]


@NgModule({
  declarations: [ProductComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(productRoutes),
    FormsModule,
    PaginationModule,
    ModalModule.forRoot(),
  ],
  providers: [DataService,NotificationService]
})
export class ProductModule { }
