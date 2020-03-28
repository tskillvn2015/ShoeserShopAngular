import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { Routes, RouterModule } from '@angular/router';

const homeRoutes: Routes = [
  //localhost:4200/main/user
 { path: '', redirectTo: 'home', pathMatch: 'full' },
  //localhost:4200/main/home/index
 { path: 'home', redirectTo: 'index' },
 { path: 'index', component: HomeComponent}
]

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(homeRoutes)
  ]
})
export class HomeModule { }
