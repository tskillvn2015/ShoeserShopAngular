import { Routes } from "@angular/router";
import { ShopComponent } from './shop.component';


export const shopRoutes: Routes = [
    {
        
        //localhost:4200/shop
        path: '', component: ShopComponent, children: [
            //localhost:4200/shop
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            //localhost:4200/shop/home
            { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },

        ]
    },
    
]