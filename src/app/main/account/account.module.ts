import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './account.component';
import {Routes,RouterModule} from '@angular/router';

const accountRoutes : Routes=[
  {path:'',redirectTo:'index',pathMatch:'full'},
  {path:'index',component:AccountComponent}
]

@NgModule({
  declarations: [AccountComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(accountRoutes)
  ]
})
export class AccountModule { }
