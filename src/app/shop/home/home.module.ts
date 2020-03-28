import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PaginationModule, ModalModule } from 'ngx-bootstrap';
import { NotificationService } from 'src/app/core/services/notification.service';
import { DataService } from 'src/app/core/services/data.service';

const homeRoutes: Routes = [
  //localhost:4200/main/user
 { path: '', redirectTo: 'index', pathMatch: 'full' },
  //localhost:4200/main/home/index
 { path: 'index', component: HomeComponent}
]

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(homeRoutes),
    FormsModule,
    PaginationModule,
    ModalModule.forRoot(),
  ],
  providers: [DataService,NotificationService]
})
export class HomeModule { }
