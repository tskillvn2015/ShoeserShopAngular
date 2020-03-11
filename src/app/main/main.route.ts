import { Routes } from "@angular/router";
import { MainComponent } from "./main.component";

export const mainRoutes: Routes = [
    {
            //localhost:4200/main
        path: '', component: MainComponent, children: [
            //localhost:4200/main
            {path: '', redirectTo: 'home', pathMatch: 'full'}, 
            //localhost:4200/main/home
            {path: 'home',loadChildren: () => import('./home/home.module').then(m => m.HomeModule)},
            //localhost:4200/main/account
            {path: 'account', loadChildren: () => import('./account/account.module').then(m => m.AccountModule)}
        ]
    }
]