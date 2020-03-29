import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PaginationModule, ModalModule } from 'ngx-bootstrap';
import { DataService } from 'src/app/core/services/data.service';
import { NotificationService } from 'src/app/core/services/notification.service';

const cartRoutes: Routes = [
  //localhost:4200/shop/cart
 { path: '', redirectTo: '/detail', pathMatch: 'full' },
  //localhost:4200/shop/cart/index
 { path: 'detail', component: CartComponent},

 { path: 'detail/:id', component: CartComponent}
 
]

@NgModule({
  declarations: [CartComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(cartRoutes),
    FormsModule,
    PaginationModule,
    ModalModule.forRoot(),
  ],
  providers: [DataService,NotificationService]

})
export class CartModule { }
