import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './account.component';
import {Routes,RouterModule} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';

import { DataService } from '../../core/services/data.service';
import { NotificationService } from '../../core/services/notification.service';

const accountRoutes : Routes=[
  {path:'',redirectTo:'index',pathMatch:'full'},
  {path:'index',component:AccountComponent}
]

@NgModule({
  declarations: [AccountComponent],
  imports: [
    PaginationModule,
    FormsModule,
    ModalModule.forRoot(),
    CommonModule,
    RouterModule.forChild(accountRoutes)
  ],
  providers: [DataService,NotificationService]
})
export class AccountModule { }
