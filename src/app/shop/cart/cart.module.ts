import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationModule, ModalModule, AccordionModule, AlertModule } from 'ngx-bootstrap';
import { DataService } from 'src/app/core/services/data.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {NgbModule,NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';

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
    NgbAlertModule,
    AccordionModule,
    NgbModule,
    ReactiveFormsModule,
    AlertModule,
    ModalModule.forRoot(),
  ],
  providers: [DataService,NotificationService],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA ],

})
export class CartModule { }
